'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // This allows us to access projects created by a user via user.projects
      User.hasMany(models.Project, {foreignKey: 'created_by', as: 'createdProjects'});
      
      // This allows us to access projects a user is a member of via user.projects
      // Using a many-to-many relationship through ProjectMembers
      User.belongsToMany(models.Project, {
        through: models.ProjectMember,
        foreignKey: 'user_id',
        otherKey: 'project_id',
        as: 'memberProjects'
      });
      // This allows us to access tasks assigned to a user via user.tasks
      User.hasMany(models.Task, {foreignKey: 'assigned_to', as: 'assignedTasks'});
      
      // This allows us to access tasks created by a user via user.createdTasks
      User.hasMany(models.Task, {foreignKey: 'created_by', as: 'createdTasks'});
      
      // This allows us to access comments made by a user via user.comments
      User.hasMany(models.Comment, {foreignKey: 'created_by', as: 'comments'});
      
    } 
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};