const { tasks } = require('../models/taskModels');

// Get all tasks
const getTasks = (req, res) => {
  res.status(200).json(tasks);
};

// Filter tasks by status
const filterTasksByStatus = (req, res) => {
  const { status } = req.params;
  const filteredTasks = tasks.filter(task => task.status.toLowerCase() === status.toLowerCase());
  res.status(200).json(filteredTasks);
};

// Create a new task
const createTask = (req, res) => {
  const { title, description, status, due_date } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
    due_date,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Update a task
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;
  const task = tasks.find(task => task.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.due_date = due_date || task.due_date;

  res.status(200).json(task);
};

// Delete a task
const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = { getTasks, filterTasksByStatus, createTask, updateTask, deleteTask };
