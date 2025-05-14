import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { validateRegister, validateLogin } from '../middlewares/validation.middleware.js';

const router = express.Router();
// @desc Register a new user
// @route POST /api/auth/register
// @access Public
router.post('/register', validateRegister, register);
// @desc Login a user
// @route POST /api/auth/login
// @access Public
router.post('/login', validateLogin, login);
// @desc Logout a user
// @route POST /api/auth/logout
// @access Private
router.post('/logout', verifyToken, logout);