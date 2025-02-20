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


// Config express-session
app.use(express.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false, httpOnly: true }
}));

// Global storage for input data
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


// Render EJS views
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/projects", (req, res) => {
  res.render("projects");
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

