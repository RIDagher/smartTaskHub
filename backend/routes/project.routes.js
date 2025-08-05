const express = require('express');
const router = express.Router();

const authenticateUser = require('../middlewares/auth.js').authenticateUser; // Import the authentication middleware`
const guardRole = require('../middlewares/guard.role.js').guardRole; // Import the role guard middleware

const { createProject, getUserProjects, getProjectById } = require('../controllers/project.controller.js');

// Route to create a new project
router.post('/user/:id/project', authenticateUser, createProject);

// Route to get all projects for the authenticated user
router.get('/user/:id/projects', authenticateUser, getUserProjects);

// Route to get a specific project by ID
router.get('/project/:id', authenticateUser, getProjectById);

// Export the router
module.exports = router;