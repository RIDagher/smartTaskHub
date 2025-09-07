// middlewares/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Make sure dotenv is loaded BEFORE routes use this middleware
// require('dotenv').config();

module.exports.authenticateUser = async (req, res, next) => {
  try {
    // 1) Extract "Bearer <token>" safely
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // 2) Verify
    // - Lock algorithm if you know it
    // - Give small clockTolerance to avoid tiny skew issues
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      clockTolerance: 5, // seconds
    });
    // console.log('[auth] verified payload:', decoded);

    // 3) Load user
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 4) Attach to request and proceed
    req.user = user;
    return next();

  } catch (err) {
    // Clear, specific messages help client behavior (e.g. auto-logout on expiration)
    if (err.name === 'TokenExpiredError') {
      console.error('[auth] TokenExpiredError:', err.expiredAt);
      return res.status(401).json({ message: 'Token expired', expiredAt: err.expiredAt });
    }
    if (err.name === 'JsonWebTokenError') {
      console.error('[auth] JsonWebTokenError:', err.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (err.name === 'NotBeforeError') {
      console.error('[auth] NotBeforeError:', err.date);
      return res.status(401).json({ message: 'Token not active yet' });
    }
    console.error('[auth] Unexpected verify error:', err);
    return res.status(500).json({ message: 'Auth verification failed' });
  }
};