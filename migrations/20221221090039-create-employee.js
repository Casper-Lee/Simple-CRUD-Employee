'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.INTEGER
      },
      department : {
        type: Sequelize.ENUM,
        values: ["HR","PS", "ADMIN"]
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: ["created_at"]
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: ["updated_at"]
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};