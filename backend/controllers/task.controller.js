// controllers/task.controller.js
const { Task, Project, ProjectMember, User } = require('../models');

module.exports.createTask = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);
    const creatorId = req.user?.id;

    if (!projectId) {
      return res.status(400).json({ message: 'Missing project id in URL' });
    }

    const { title, description, status, due_date, assigned_to } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'title and description are required' });
    }

    // 1) Ensure project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // 2) Ensure the caller is allowed to add tasks (project creator or member)
    const isCreator = project.created_by === creatorId;
    const isMember = await ProjectMember.findOne({
      where: { project_id: projectId, user_id: creatorId },
    });
    if (!isCreator && !isMember) {
      return res.status(403).json({ message: 'You are not a member of this project' });
    }

    // 3) If assigned_to is provided, ensure that user exists and is a member of the project
    let assigneeId = assigned_to ?? null;
    if (assigneeId != null) {
      const assignee = await User.findByPk(assigneeId);
      if (!assignee) {
        return res.status(400).json({ message: 'Assignee user does not exist' });
      }
      const assigneeIsMember = await ProjectMember.findOne({
        where: { project_id: projectId, user_id: assigneeId },
      });
      if (!assigneeIsMember && project.created_by !== assigneeId) {
        return res.status(400).json({ message: 'Assignee is not a member of this project' });
      }
    }

    // 4) Create the task (status defaults to 'todo' if not provided)
    const newTask = await Task.create({
      title,
      description,
      status: status || 'todo',     // ENUM('todo','in_progress','done')
      due_date: due_date || null,   // optional
      project_id: projectId,
      assigned_to: assigneeId,      // can be null
      created_by: creatorId,
    });

    return res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (err) {
    console.error('Error creating task:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};