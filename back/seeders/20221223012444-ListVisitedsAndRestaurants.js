'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ListViditedAndRestaurants', 
    [
      {id:1,listVisitedID:2,restaurantID:5,datum:new Date()},
      {id:2,listVisitedID:2,restaurantID:5,datum:new Date()},
      {id:3,listVisitedID:3,restaurantID:5,datum:new Date()},
      {id:4,listVisitedID:4,restaurantID:1,datum:new Date()},
      {id:5,listVisitedID:2,restaurantID:2,datum:new Date()}

    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ListViditedAndRestaurants', null, {});
  }
};
