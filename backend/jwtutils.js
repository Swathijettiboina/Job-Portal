const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key'; // Use a more secure secret in production

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY); // Verify the token
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { generateToken, verifyToken };
