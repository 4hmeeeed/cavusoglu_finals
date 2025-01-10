const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, filterTasksByStatus } = require('../controllers/taskControllers');

const router = express.Router();

// Routes
router.get('/', getTasks);
router.get('/:status', filterTasksByStatus);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
