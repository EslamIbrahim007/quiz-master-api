import { check } from 'express-validator';
import { validatorMiddleware } from './validatorMiddleware.js';
import User  from '../../models/User.model.js';

// Validation for user registration
export const validateRegister = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email already in use');
      }
    }),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  validatorMiddleware,
];
// Validation for user login
export const validateLogin = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('password')
    .notEmpty()
    .withMessage('Password is required'),
  validatorMiddleware,
];
