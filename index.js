const express = require("express");
const app = express();

app.use(express.json());

let storedData = ""; // Store data in memory

// Route to receive data
app.post("/send", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).send("No data received");
  }
  storedData = data; // Store data in memory
  res.send("Data stored successfully");
});

// Route to send stored data
app.get("/receive", (req, res) => {
  if (!storedData) {
    return res.status(404).send("No data available");
  }
  res.send(storedData);
});

// Export the app for Vercel
module.exports = app;
