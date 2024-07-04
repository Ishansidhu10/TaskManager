// tasksController.js

// Example data store (replace with database integration)

const TaskModel = require("../models/Task");

// Controller function to get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Controller function to get a task by ID
exports.getTaskById = async (req, res) => {
  const taskId = parseInt(req.params.id);
  try {
    const task = await TaskModel.getTaskById(taskId);
    res.json(task);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Controller function to create a new task
exports.createTask = async (req, res) => {
  const { task_name, description } = req.body;
  try {
    const createdTask = await TaskModel.createTask(task_name, description);
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Controller function to update a task by ID
exports.updateTaskById = async (req, res) => {
  const taskId = parseInt(req.params.id);
  const { name, description } = req.body;
  try {
    const result = await TaskModel.updateTaskById(taskId, name, description);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// Controller function to delete a task by ID
exports.deleteTaskById = async (req, res) => {
  const taskId = parseInt(req.params.id);
  try {
    const result = await TaskModel.deleteTaskById(taskId);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
