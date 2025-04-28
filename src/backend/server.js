const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 4000;
const SECRET_KEY = "your_secret_key";

app.use(cors());
app.use(bodyParser.json());

const usersFile = "users.json";

const loadUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile, "utf8"));
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Signup Route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  let users = loadUsers();

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  saveUsers(users);

  res.json({ message: "Signup successful" });
});

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Protected routes
app.post("/start", authenticateToken, (req, res) => {
  res.json({ message: "Monitoring started" });
});

app.post("/stop", authenticateToken, (req, res) => {
  res.json({ message: "Monitoring stopped" });
});

app.get("/status", authenticateToken, (req, res) => {
  // This would be connected to your actual monitoring system
  res.json({ alert: false });
});

// Test Route to Check if Server is Running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});