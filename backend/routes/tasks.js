import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// Get all tasks
router.get('/', authMiddleware, getAllTasks);

// Get task by ID
router.get('/:id', authMiddleware, getTaskById);

// Create new task
router.post('/', authMiddleware, createTask);

// Update existing task
router.put('/:id', authMiddleware, updateTask);

// Remove existing task
router.delete('/:id', authMiddleware, deleteTask);

export default router;
