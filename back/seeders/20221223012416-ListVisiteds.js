'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ListVisiteds', 
    [
      {id:1,userID:5,dateOfVisit:new Date()},
      {id:2,userID:2,dateOfVisit:new Date()},
      {id:3,userID:2,dateOfVisit:new Date()},
      {id:4,userID:4,dateOfVisit:new Date()},
      {id:5,userID:1,dateOfVisit:new Date()}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ListVisiteds', null, {});
  }
};
