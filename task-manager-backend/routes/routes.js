const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateJWT = require("../middleware/auth.js");
const tasksController = require("../controllers/taskController"); // Import tasks controller

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authenticateJWT, authController.logout); // Protect logout route

// Protected route example
router.get("/protected", authenticateJWT, (req, res) => {
  res
    .status(200)
    .json({ message: "You have accessed a protected route!", user: req.user });
});

// CRUD operations for tasks
router.post("/tasks", tasksController.createTask);
router.get("/tasks", tasksController.getAllTasks);
router.get("/tasks/:id", tasksController.getTaskById);
router.put("/tasks/:id", tasksController.updateTaskById);
router.delete("/tasks/:id", tasksController.deleteTaskById);

module.exports = router;
