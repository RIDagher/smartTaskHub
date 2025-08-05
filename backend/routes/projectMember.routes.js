const express = require('express');
const router = express.Router();    


const {authenticateUser} = require('../middlewares/auth.js');  // Import the authentication middleware
const { guardRole } = require('../middlewares/guard.role.js'); // Import the role guard

const {addProjectMember} = require('../controllers/projectMember.controller.js');

// Route to create a new project member
router.post('/project/:projectId/members',  addProjectMember);

// Export the router
module.exports = router;