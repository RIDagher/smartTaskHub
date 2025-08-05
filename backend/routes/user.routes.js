const express = require('express');
const router = express.Router();

const {guardRole} = require('../middlewares/guard.role.js');
const {authenticateUser} = require('../middlewares/auth.js'); // Uncomment if you have an authentication middleware

// const { authenticateUser } = require('../middlewares/auth.js');
const { registerUser, loginUser, getUserById, getAllUsers } = require('../controllers/user.controller.js');

// Route to register a new user
router.post('/users/register', registerUser); 

// Route to login a user
router.post('/users/login', loginUser); 

// Route to get user by ID
router.get('/user/:id', guardRole('admin') ,getUserById);

// Route to get all users by admin
// Ensure that only authenticated users with the 'admin' role can access this route
router.get('/users', authenticateUser, guardRole('admin') ,getAllUsers)


module.exports = router;