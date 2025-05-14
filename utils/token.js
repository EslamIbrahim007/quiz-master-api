import jwt from 'jsonwebtoken';
// Function to generate a JWT token
export const createToken = (id) => {
  return jwt.sign({ id,role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};




