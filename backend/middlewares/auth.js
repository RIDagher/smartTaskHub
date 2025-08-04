const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

module.exports.authenticateUser = async (req, res, next) => {

    // Check if the request has an authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
        // Verify the token and extract user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        // Find the user by ID from the decoded token
        const user = await User.findById(decoded.id);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
        // Attach user information to the request object
        req.user = user;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
