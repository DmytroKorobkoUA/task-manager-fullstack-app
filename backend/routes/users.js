import express from 'express';
import authMiddleware from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import { getAllUsers, getUserById, registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

// Sign up
router.post('/register', registerUser);

// Sign in
router.post('/login', loginUser);

export default router;
