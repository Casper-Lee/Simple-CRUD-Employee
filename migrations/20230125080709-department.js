'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('departments', [{
      department: 'PS',
      created_at: new Date(),
      updated_at: new Date()
    },{
      department:'HR',
      created_at: new Date(),
      updated_at: new Date()
    },{
      department:'ADMIN',
      created_at: new Date(),
      updated_at: new Date()
    }]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('departments', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
