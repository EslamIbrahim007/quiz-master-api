import ApiError from '../utils/error.js';
import jwt from 'jsonwebtoken';
// // Function to verify a JWT token from the request headers and check if the user is authenticated and logged in
export const verifyToken = (req, res, next) => {
  let token;
  // Check if the token is present in the request headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // If no token is found, return an error
  if (!token) {
    return next(new ApiError(401, 'You are not logged in! Please log in to get access.'));
  }
  // Verify the token and attach the user to the request object
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ApiError(403, 'Invalid token'));
    }
    req.user = decoded;
    next();
  });
};
// Middleware to protect routes