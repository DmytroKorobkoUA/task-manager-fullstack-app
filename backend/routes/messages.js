import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getMessages, createMessage, deleteMessage } from '../controllers/messageController.js';

const router = express.Router();

// Get all messages
router.get('/', authMiddleware, getMessages);

// Create new message
router.post('/', authMiddleware, createMessage);

// Delete a message
router.delete('/:id', authMiddleware, deleteMessage);

export default router;
