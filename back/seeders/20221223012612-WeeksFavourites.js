'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('WeeksFavourites', 
    [
      {id:1,weekNo:12,date:new Date(),restaurantID:3},
      {id:2,weekNo:2,date:new Date(),restaurantID:2},
      {id:3,weekNo:52,date:new Date(),restaurantID:5},
      {id:4,weekNo:6,date:new Date(),restaurantID:3},
      {id:5,weekNo:34,date:new Date(),restaurantID:3},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('WeeksFavourites', null, {});
  }
};
