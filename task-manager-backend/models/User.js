// models/User.js
const mysql = require("mysql2");

// Create connection to MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ishansidhu2004!",
  database: "taskdb",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

// Define User model methods
class User {
  static getAll(callback) {
    connection.query("SELECT * FROM users", callback);
  }

  static getById(id, callback) {
    connection.query("SELECT * FROM users WHERE id = ?", [id], callback);
  }

  static create(newUser, callback) {
    connection.query("INSERT INTO users SET ?", newUser, callback);
  }

  static updateById(id, updatedUser, callback) {
    connection.query(
      "UPDATE users SET ? WHERE id = ?",
      [updatedUser, id],
      callback
    );
  }

  static deleteById(id, callback) {
    connection.query("DELETE FROM users WHERE id = ?", [id], callback);
  }
}

module.exports = User;
