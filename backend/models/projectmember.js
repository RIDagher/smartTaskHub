'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      // This allows us to access the project a member belongs to via projectMember.project
      ProjectMember.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
      // This allows us to access the user who is a member of the project via projectMember.user
      ProjectMember.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      
    }
  }
  ProjectMember.init({
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ProjectMember',
  });
  return ProjectMember;
};