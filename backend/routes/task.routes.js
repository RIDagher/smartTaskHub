const express = require('express')
const router = express.Router()

const authenticateUser = require('../middlewares/auth.js').authenticateUser; // Import the authentication middleware`
const guardRole = require('../middlewares/guard.role.js').guardRole; // Import the role guard middleware

const {createTask} = require('../controllers/task.controller.js');
const { getProjectById } = require('../controllers/project.controller.js');

router.post('/projects/:projectId/tasks', authenticateUser, createTask)


module.exports = router