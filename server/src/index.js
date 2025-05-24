// server/src/index.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Example route
app.get("/", (req, res) => {
  res.send("Event Calendar App API");
});

// TODO: Add authentication, event, and user routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
