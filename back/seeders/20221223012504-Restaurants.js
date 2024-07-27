'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Restaurants', 
    [
      {id:1, name:"Roll Bar", radnoVreme:"9-23",typeID:1,locationID:1},
      {id:2, name:"Ole", radnoVreme:"9-23",typeID:2,locationID:2},
      {id:3, name:"RRR", radnoVreme:"9-23",typeID:3,locationID:3},
      {id:4, name:"HILL", radnoVreme:"9-23",typeID:4,locationID:4},
      {id:5, name:"Bar", radnoVreme:"9-23",typeID:5,locationID:5}


    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null, {});
  }
};
