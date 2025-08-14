const {Project} = require('../models');

// Function to create a new project
module.exports.createProject = async (req, res) => {
    console.log("Creating project with data:", req.body);
    const { name, description} = req.body;


    // Get user ID from request
   const userId = req.user?.id
    // Check if user is authorized to create project
    if(req.user.id !== Number(req.params.id)) {
        return res.status(403).json({ message: 'Forbidden' });
    }

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

// Function to get all projects for a user
module.exports.getUserProjects = async (req, res) => {

    // Get user ID from request
   if (req.query.member === "me") {
        userId = req.user.id; // comes from JWT
  } else if (req.params.id) {
    // still allow explicit ID but verify it matches logged-in user
    if (req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // if explicit ID provided, use that
    userId = req.params.id;
  }
    
    console.log("Fetching projects for user ID:", userId);

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Fetch projects created by the user
        const projects = await Project.findAll({ where: { created_by: userId } });
        return res.status(200).json( projects );
    } catch (error) {
        console.error("Error fetching user projects:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to get a specific project by ID
module.exports.getProjectById = async (req, res) => {
    const userId = req.user.id;
    // Check if user is authorized to access projects
    if(req.user.id !== Number(req.params.id)) {  
        return res.status(403).json({ message: 'Forbidden' });
    }
    console.log("Fetching project with ID:", id);

    try {
        // Fetch project by ID
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json({ project });
    } catch (error) {
        console.error("Error fetching project by ID:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}