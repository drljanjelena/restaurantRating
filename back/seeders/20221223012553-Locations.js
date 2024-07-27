'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Locations', 
    [
      {id:1, street:"Obilicev venac", number:"1",city:"Beograd",zipnumber:11000},//rollbar
      {id:2, street:"Kikindska", number:"9",city:"Beograd",zipnumber:11211},//ole
      {id:3, street:"Brace Jovandic", number:"1",city:"Novi Sad",zipnumber:21000},//piceria ciao
      {id:4, street:"Jovana Cvijica", number:"15",city:"Loznica",zipnumber:15300},//poslasticarnica perla
      {id:5, street:"Kej Oslobodjenja", number:"29",city:"Beograd",zipnumber:11000}//moonze
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', null, {});
  }
};
