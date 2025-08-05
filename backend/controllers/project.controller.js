const {Project} = require('../models');

// Function to create a new project
module.exports.createProject = async (req, res) => {
    console.log("Creating project with data:", req.body);
    const { name, description} = req.body;

    
    
   const userId = req.user?.id
    console.log("User ID from request:", userId);
    // Validate user ID and project details
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if (!name || !description) {
        return res.status(400).json({ message: 'Project name and description are required' });
    }

    try {
        // Create new project
        const newProject = await Project.create({ name, description, created_by: userId });
        return res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}