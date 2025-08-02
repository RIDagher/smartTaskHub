'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
          allowNull: false,
          // Using ENUM type for status with default value
          type: Sequelize.ENUM,
          values: ['todo', 'in_progress', 'done'],
          defaultValue: 'todo',
          allowNull: false
        
      },
      due_date: {
        type: Sequelize.DATE
      },
      project_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Projects',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      },
      assigned_to: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Assuming you have a Users table
          key: 'id'
        },
        onDelete: 'SET NULL', // or 'CASCADE' based on your requirement
        // This allows the task to remain even if the user is deleted
        // but you can also choose to delete the task if the user is deleted
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Tasks_status";'); // Clean up ENUM type if it exists
    // This ensures that the ENUM type is removed if it was created during the migration
  }
};