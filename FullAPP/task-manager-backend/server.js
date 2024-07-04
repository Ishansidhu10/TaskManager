const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // If you need CORS support
const db = require("./config/db"); // Your database connection setup using mysql2
const routes = require("./routes/routes.js"); // Your application routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS (if needed, allows requests from other origins)
app.use(cors());

// Routes
app.use("/", routes); // Mount all your routes under '/'

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use((req, res, next) => {
  console.log(res);
  console.log("Incoming request body:", req.body);
  next();
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Ensure your MySQL database connection is initialized
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
  connection.release();
});
