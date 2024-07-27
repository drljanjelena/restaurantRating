'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Ocenas', 
    [
      {id:1,ocena:1,opis:"izuzetno lose"},
      {id:2,ocena:2,opis:"lose"},
      {id:3,ocena:3,opis:"prosecno"},
      {id:4,ocena:4,opis:"dobro"},
      {id:5,ocena:5,opis:"izuzetno dobro"}
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
