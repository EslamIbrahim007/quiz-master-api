// Importing necessary modules and functions
import User from '../models/User.model.js';
import asyncHandler from 'express-async-handler';
import { createToken } from '../utils/token.js';
import ApiError  from '../utils/error.js';

// @desc    Register a new user
// @route   POST /api/auth/register
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(ApiError(400, 'User already exists'));
  }
  // create a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate a token
  const token = createToken(user._id, user.role);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});
// @desc    Login a user
// @route   POST /api/auth/login
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.find({ email });
  if (!user) {
    return next(createError(400, 'user not found'));
  }
  // Check if password is correct
  const isPasswordCorrect = await user.isPasswordMatch(password);
  if (!isPasswordCorrect) {
    return next(ApiError(400, 'Invalid credentials'));
  }
  // Generate a token
  const token = createToken(user._id, user.role);
  // Send response
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});
// @desc    Logout a user
// @route   POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  // Clear the token from the client side
  res.status(200).json({
    message: 'Logged out successfully',
  });
});