'use strict';
const {
  Model,
  ENUM
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // This allows us to access the project a task belongs to via task.project
      Task.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
      // This allows us to access the user assigned to a task via task.assignedUser
      Task.belongsTo(models.User, { foreignKey: 'assigned_to', as: 'assignedUser' });
      // This allows us to access the user who created the task via task.creator
      Task.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      // This allows us to access comments made on a task via task.comments
      Task.hasMany(models.Comment, { foreignKey: 'task_id', as: 'comments' });
      
      

    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: ENUM('todo', 'in_progress', 'done'),
      defaultValue: 'todo',
      allowNull: false
    },
    due_date: DataTypes.DATE,
    project_id: DataTypes.INTEGER,
    assigned_to: DataTypes.INTEGER,
    created_by: {
      allowNull: false,
      type: DataTypes.INTEGER,}
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};