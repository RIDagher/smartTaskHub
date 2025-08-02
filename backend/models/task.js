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
    assigned_to: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};