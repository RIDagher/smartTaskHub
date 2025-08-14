const {ProjectMember} = require('../models');

// Function to add a member to a project
module.exports.addProjectMember = async (req, res) => {
    const { projectId } = req.params;        // from the URL
    const { user_id } = req.body;            // from the request body
    const project_id = parseInt(projectId, 10); // Convert projectId to integer
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

