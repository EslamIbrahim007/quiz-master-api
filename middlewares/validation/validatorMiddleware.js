import { validationResult } from 'express-validator';

export const validatorMiddleware = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  // If no errors, proceed to the next middleware
  next();
};