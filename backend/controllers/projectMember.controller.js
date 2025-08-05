const {ProjectMember} = require('../models');

// Function to add a member to a project
module.exports.addProjectMember = async (req, res) => {
    const { project_id, user_id } = req.body;
    console.log("Adding project member with data:", req.body);
    
    console.log("Adding user ID to project:", user_id, project_id);
    try {
        // Validate project ID and user ID
        if (!project_id || !user_id) {
            return res.status(400).json({ message: 'Project ID and User ID are required' });
        }
        // Check if the user is already a member of the project
        const existingMember = await ProjectMember.findOne({ where: { project_id, user_id } });
        if (existingMember) {
            return res.status(400).json({ message: 'User is already a member of this project' });
        }   
        // Add the user to the project
        const newMember = await ProjectMember.create({ project_id, user_id });
        return res.status(201).json({ message: 'User added to project successfully', member: newMember });
    } catch (error) {
        console.error("Error adding project member:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

