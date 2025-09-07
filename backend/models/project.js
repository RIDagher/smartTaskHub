'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // This allows us to access tasks associated with a project via project.tasks
      Project.hasMany(models.Task, { foreignKey: 'project_id', as: 'tasks' });

      // This allows us to access the user who created the project via project.creator
      Project.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
      
      // This allows us to access members of a project via project.members
      Project.belongsToMany(models.User, {
        through: models.ProjectMember,
        foreignKey: 'project_id',
        otherKey: 'user_id',
        as: 'members'
      });
    
    }
  }
  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Project',
    
  });
  return Project;
};