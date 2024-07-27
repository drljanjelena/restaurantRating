'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Komentaris', 
    [
      {id:"1",userID:"2",ocenaID:"5",restaurantID:"5",kontent:"Ovo je komentar"},
      {id:"2",userID:"3",ocenaID:"2",restaurantID:"2",kontent:"Ovo je komentar2"},
      {id:"3",userID:"3",ocenaID:"3",restaurantID:"1",kontent:"Ovo je komentar3"},
      {id:"4",userID:"5",ocenaID:"4",restaurantID:"5",kontent:"Ovo je komentar4"},
      {id:"5",userID:"6",ocenaID:"4",restaurantID:"5",kontent:"Ovo je komentar5"}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Komentaris', null, {});
  }
};
