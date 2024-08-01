import express from 'express';
import authMiddleware from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

// Create new user
router.post('/', authMiddleware, authorize('admin'), createUser);

// Update existing user
router.put('/:id', authMiddleware, authorize('admin'), updateUser);

// Remove existing user
router.delete('/:id', authMiddleware, authorize('admin'), deleteUser);

// Sign up
router.post('/register', registerUser);

// Sign in
router.post('/login', loginUser);

export default router;
