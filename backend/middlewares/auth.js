const jwt = require('jsonwebtoken');
const { User } = require('../models'); // If you're using models/index.js to export all

module.exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Token from request:", token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Fetch user from database
    const user = await User.findByPk(decoded.id);
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user to request object
    req.user = user;
    console.log("Authenticated user:", req.user);
    next();

  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};