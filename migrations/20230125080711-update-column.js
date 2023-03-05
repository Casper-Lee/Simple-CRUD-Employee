"use strict";

const { DataTypes, QueryInterface, Sequelize } = require("sequelize");

// https://stackoverflow.com/questions/65972228/how-to-associate-models-in-es6-syntax-using-sequelize-v6

module.exports = {
  async up(queryInterface, dataTypes) {
    /**
     * Add altering commands here.
     */

    await queryInterface.addColumn(
      "employees", // name of Source model
      "department_id", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
      }
      );
      console.log('==================================')
      // console.log(Sequelize)
      
      // await queryInterface
      // .changeColumn("employees", "department", {
      //   type: Sequelize.STRING,
      // })
      // .then(() => {
        queryInterface.sequelize.query(
          "UPDATE employees SET department_id = departments.id FROM departments WHERE employees.department::varchar = departments.department::varchar;"
        );
      

    await queryInterface.changeColumn("employees", "department_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */

    await queryInterface.removeColumn("employees", "department_id");
  },
};