const express = require('express');
const router = express.Router();

// const guardRole = require('../middlewares/guard.role.js');
// const authenticateUser = require('../middlewares/auth.js'); // Uncomment if you have an authentication middleware

// const { authenticateUser } = require('../middlewares/auth.js');
const { registerUser, loginUser, getUserById } = require('../controllers/user.controller.js');

router.post('/users/register', registerUser); 
router.post('/users/login', loginUser); 
router.get('/user/:id', getUserById); // Assuming you have a function to get user by ID
module.exports = router;