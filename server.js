const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")
const path = require("path");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db', (err) => {
  if (err) console.error("DB Connection Error:", err);
});

require('dotenv').config();

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}));

let inputData = {
    startTime: "",
    endTime: ""
};

app.use(cors());
app.use(bodyParser.json());


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Store received sensor data
let sensorData = {};

// Endpoint to receive data from ESP32
app.post("/data", (req, res) => {
    sensorData = req.body;
    console.log("Received Data:", sensorData);
    res.send({ message: "Data received successfully" });
});

// Endpoint to send sensor data to frontend
app.get("/data", (req, res) => {
    res.json(sensorData);
});

// ESP32 fetches static data from the server
app.get("/get-data", (req, res) => {
    console.log("Received data: ", inputData);

    // Send a JSON response
    res.json({ message: "Data received: ", inputData});
})

// Endpoint for the UI to submit data
app.get("/submit-data", (req, res) => {
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;
    
    // Store the data in the global variable
    storedInputData = { startTime, endTime };
    console.log("Stored data:", storedInputData);
    res.json({ message: "Data stored" });
});

app.get("/update-input", (req, res) => {
    inputData.startTime = req.query.startTime;
    inputData.endTime = req.query.endTime;

    console.log("inputData updated to:", inputData);
    res.json({ message: "Updated", inputData });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err) return res.status(500).json({ message: "Internal error" });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        const match = await bcrypt.compare(password, user.hashedPassword);
        if (match) {
            req.session.userId = user.id;
            req.session.username = user.username;
            res.json({ message: "Logged in", username: user.username });
        } else {
            res.status(401).json({ message: "Wrong password!" });
        }
    });
});

app.post("/register", (req, res) => {
    const {username, password } = req.body;
    console.log(username + password)
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }
    // Check if user exists
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if(err) return res.status(500).json({ message: "Internal error" });
        if(err) return res.status(409).json({ message: "User already exists" });
        // Hash password
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ message: "Error hashing password"});
                // Insert user to db
                db.run("INSERT INTO users (username, hashedPassword) VALUES (?, ?)", [username, hash], function(err) {
                if(err) return res.status(500).json({ message: "Error registering user"});
                res.json({message: "User registered successfully" });
            });
        });
    });
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
        return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: "Logged out successfully" });
    });
});

app.get('/session', (req, res) => {
    if(req.session.userId) {
        res.json({ loggedIn: true, username: req.session.username });
    } else {
        res.json({ loggedIn: false});
    }
});

// POST chat endpoint
app.post("/chat", (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const { message } = req.body;
    const userId = req.session.userId;
    const username = req.session.username;

    db.run("INSERT INTO chats (user_id, message) VALUES (?, ?)", [userId, message], function(err) {
        if (err) {
            console.error("Insert error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        console.log("Inserted message, lastID:", this.lastID);
        db.get("SELECT * FROM chats WHERE id = ?", [this.lastID], (err, row) => {
            if (err) {
                console.error("Query error:", err);
                return res.status(500).json({ error: "Database error" });
            }
            // Format timestamp to ISO
            let formattedTimestamp = row.timestamp;
            if (formattedTimestamp && formattedTimestamp.indexOf("T") === -1) {
                formattedTimestamp = formattedTimestamp.replace(" ", "T");
            }
            res.json({
                id: row.id,
                username: username,
                message: row.message,
                timestamp: formattedTimestamp,
                vote: row.vote
            });
        });
    });
});

// Load chat history
app.get("/chat/history", (req, res) => {
    const userId = req.session.userId || 0;
    const query = `
        SELECT chats.id, chats.message, chats.timestamp, chats.vote, users.username,
        (SELECT vote FROM votes WHERE chat_id = chats.id AND user_id = ?) AS userVote
        FROM chats 
        JOIN users ON chats.user_id = users.id 
        ORDER BY chats.vote DESC, chats.timestamp
  `;
    db.all(query, [userId], (err, rows) => {
        if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
});

// Voting endpoint
app.post("/chat/vote", (req, res) => {
    console.log("Vote endpoint session: "+ req.session);
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const { chatId, vote } = req.body; // validate 1 or -1
    if (![1, 0, -1].includes(vote)) {
        return res.status(400).json({ error: "Invalid vote value" });
    }
    const userId = req.session.userId;

    // Check if user has already voted
    db.get(`SELECT vote FROM votes WHERE user_id = ? AND chat_id = ?`, [userId, chatId], (err, row) => {
        if(err){
            return res.status(500).json({ error: "Database error" });
        }
        // Case 1: vote exists
        if (row){
            if (vote === 0){
                db.run(`DELETE FROM votes WHERE user_id = ? AND chat_id = ?`, [userId, chatId], (err, row) => {
                    if (err){
                        console.error("Update error:", err);
                        return res.status(500).json({ error: "Database error" });
                    }
                    updateChatVoteCount(false);
                });
            } else {
                if (row.vote === vote) {
                    // If same, delete the vote (i.e., reset it to 0)
                    db.run("DELETE FROM votes WHERE user_id = ? AND chat_id = ?", [userId, chatId], (err) => {
                    if (err) {
                        console.error("Delete error:", err);
                        return res.status(500).json({ error: "Database error" });
                    }
                    updateChatVoteCount(true);
                    });
                } else {
                    // Otherwise, update the vote to the new value
                    db.run("UPDATE votes SET vote = ? WHERE user_id = ? AND chat_id = ?", [vote, userId, chatId], (err) => {
                    if (err) {
                        console.error("Update error:", err);
                        return res.status(500).json({ error: "Database error" });
                    }
                    updateChatVoteCount(false);
                    });
                }
            }
            // Case 2: vote doesn't exist
            } else {
                console.log("vote doesnt exist");
                if (vote !== 0) {
                    db.run("INSERT INTO votes (user_id, chat_id, vote) VALUES (?, ?, ?)", [userId, chatId, vote], function(err) {
                    if (err) {
                        console.error("Insert error:", err);
                        return res.status(500).json({ error: "Database error" });
                    }
                    updateChatVoteCount(false);
                    });
                } else {
                    // Vote is 0 and no previous vote exists – nothing to do
                    updateChatVoteCount(false);
            };
        }

        function updateChatVoteCount(toggle) {
            db.get("SELECT COALESCE(SUM(vote), 0) AS totalVote FROM votes WHERE chat_id = ?", [chatId], (err, row) => {
                if (err) {
                    console.error("Sum query error:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                db.run("UPDATE chats SET vote = ? WHERE id = ?", [row.totalVote, chatId], function(err) {
                    if (err) {
                        console.error("Update chat vote error:", err);
                        return res.status(500).json({ error: "Database error" });
                    }
                    res.json({ chatId, vote: row.totalVote, toggle });
                });
            });
        }
    });
});

// Render EJS views
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/projects", (req, res) => {
  res.render("projects", { username: req.session.username });
});

app.get("/chat", (req, res) => {
  res.render("chat");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(3000, () =>
  console.log("Server running on 57.129.61.111:3000")
);