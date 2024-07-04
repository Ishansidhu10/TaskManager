const express = require("express");
const pool = require("../config/db");

// Create a new task
exports.createTask = async (task_name, description) => {
  console.log(task_name, description);
  try {
    const [results] = await pool.execute(
      "INSERT INTO tasks (task_name, description) VALUES (?, ?)",
      [task_name, description]
    );
    return { id: results.insertId, task_name, description };
  } catch (error) {
    throw error;
  }
};

// Get all tasks
exports.getAllTasks = async () => {
  try {
    const [results] = await pool.execute("SELECT * FROM tasks");
    return results;
  } catch (error) {
    throw error;
  }
};

// Get task by ID
exports.getTaskById = async (taskId) => {
  try {
    const [results] = await pool.execute("SELECT * FROM tasks WHERE id = ?", [
      taskId,
    ]);
    if (results.length === 0) {
      throw new Error("Task not found");
    }
    return results[0];
  } catch (error) {
    throw error;
  }
};

// Update task by ID
exports.updateTaskById = async (taskId, task_name, description) => {
  console.log(taskId, task_name, description);
  try {
    const [results] = await pool.execute(
      "UPDATE tasks SET task_name = ?, description = ? WHERE id = ?",
      [task_name, description, taskId]
    );
    if (results.affectedRows === 0) {
      throw new Error("Task not found");
    }
    return { message: "Task updated successfully" };
  } catch (error) {
    throw error;
  }
};

// Delete task by ID
exports.deleteTaskById = async (taskId) => {
  try {
    const [results] = await pool.execute("DELETE FROM tasks WHERE id = ?", [
      taskId,
    ]);
    if (results.affectedRows === 0) {
      throw new Error("Task not found");
    }
    return { message: "Task deleted successfully" };
  } catch (error) {
    throw error;
  }
};
