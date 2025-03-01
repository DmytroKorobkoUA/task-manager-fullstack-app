import express from 'express';
import authMiddleware from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { getAdminRoot, createUser, updateUser, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

// Admin root
router.get('/', authMiddleware, authorize('admin'), getAdminRoot);

// Create new user
router.post('/users', authMiddleware, authorize('admin'), createUser);

// Update existing user
router.put('/users/:id', authMiddleware, authorize('admin'), updateUser);

// Remove existing user
router.delete('/users/:id', authMiddleware, authorize('admin'), deleteUser);

export default router;
