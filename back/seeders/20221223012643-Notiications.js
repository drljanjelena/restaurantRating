'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notifications', 
    [
      {id:1,content:"U kaficu Roll Bar doslo je do izmene radnog vremena",restaurantID:"1",typeNID:"1"},
      {id:2,content:"Promena u meniju",restaurantID:"5",typeNID:"5"},
      {id:3,content:"Nova lokacija",restaurantID:"4",typeNID:"3"},
      {id:4,content:"Evenet veceras u 20h!",restaurantID:"4",typeNID:"2"},
      {id:5,content:"Zatvaranje",restaurantID:"2",typeNID:"1"},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};
