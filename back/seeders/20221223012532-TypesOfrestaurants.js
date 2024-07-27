'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TypeOfRestaurants', 
    [
      {id:1,name:"Poslasticarnica"},
      {id:2,name:"Restoran brze hrane"},
      {id:3,name:"Bisto"},
      {id:4,name:"Picerija"},
      {id:5,name:"Gostionica"}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TypeOfRestaurants', null, {});
  }
};
