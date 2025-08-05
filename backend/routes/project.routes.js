const express = require('express');
const router = express.Router();

const authenticateUser = require('../middlewares/auth.js').authenticateUser; // Import the authentication middleware`
const guardRole = require('../middlewares/guard.role.js').guardRole; // Import the role guard middleware
const { createProject } = require('../controllers/project.controller.js');

// Route to create a new project
router.post('/user/:id/project', authenticateUser, createProject);

// Export the router
module.exports = router;