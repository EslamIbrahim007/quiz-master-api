import { ApiError } from '../utils/error.js';
import { verifyToken } from '../utils/token.js';
import asyncHandler from 'express-async-handler';

//create a middleware allow roles to access the route
export const allowTo = (...roles) => asyncHandler(async (req, res, next) => { 
  //1. access the role from user that is attached to the request
  const userRole= req.user.role;
  //2. check if the user role is included in the roles array
  if(!roles.includes(userRole)){
    return next(new ApiError(403,'You are not authorized to access this route'));
  }
  //3. if the user role is included in the roles array, allow access to the route
  next();
}) 


