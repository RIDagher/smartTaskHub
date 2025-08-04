'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // This allows us to access the task a comment belongs to via comment.task
      Comment.belongsTo(models.Task, { foreignKey: 'task_id', as: 'task' });

      // This allows us to access the user who created the comment via comment.creator
      Comment.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });

   
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};