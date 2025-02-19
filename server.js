const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")
const path = require("path");

const app = express();

// Global storage for input data
let inputData = {
  startTime: "",
  endTime: ""
};

app.use(cors());
app.use(bodyParser.json());
const hashedPassword = "$2b$10$Ts2QJ8VWf277d9BGg9TQ5uAExN6k9T.87XGN20ldk721dx3h4IGKy";


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images, etc.)
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

app.post("/login", async (req, res) => {
    const { password } = req.body;
    
    if (!password) return res.status(400).json({ message: "Password required" });
    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
        res.json({ message: "Access granted!" });
    } else {
        res.status(401).json({ message: "Wrong password!" });
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





app.listen(3000, () =>
  console.log("Server running on 57.129.61.111:3000")
);

