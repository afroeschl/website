const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Store received data
let sensorData = {};

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Additional route for '/projects'
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

// Additional route for '/test'
app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

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

// New Endpoint: ESP32 fetches static data from the server
app.get("/get-data", (req, res) => {
    res.json({ message: "Data from Server:", value: 42 });
});

// Serve index.html for the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => console.log("Server running on 57.129.61.111:3000"));

