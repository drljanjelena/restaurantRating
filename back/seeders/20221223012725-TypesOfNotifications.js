'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('TypesOfNotifications', 
    [
      {id:1, name:"Promena radnog vremena"},
      {id:2, name:"Promena lokacije"},
      {id:3, name:"Zatvaranje retorana"},
      {id:4, name:"Otvaranje restorana na jos jednoj lokaciji"},
      {id:5, name:"Novine u meniju"}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TypesOfNotifications', null, {});
  }
};
