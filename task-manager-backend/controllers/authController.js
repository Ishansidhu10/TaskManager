const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db.js");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    console.log(password);
    // Check if password is provided
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Generate hash with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Use 10 salt rounds

    // Create user with hashed password
    const [result] = await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // Create a JWT token
    const token = jwt.sign({ userId: result.insertId }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find user by email
    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const user = rows[0];

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is not valid, return 401
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    console.log("Logged in!");
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logged out" });
};
