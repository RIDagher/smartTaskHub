const express = require('express');
const router = express.Router();

// const { authenticateUser } = require('../middlewares/auth.js');
const { registerUser, loginUser } = require('../controllers/user.controller.js');

router.post('/users/register', registerUser); 
router.post('/users/login', loginUser); 

module.exports = router;