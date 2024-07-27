'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', 
    [
      {id:1,name:"Nastasja",password:"$2b$10$kv5Qu1vSqEkbKWIviC3uN.w8D9.1NsA88v4F6T4xILOG1k59F8IkW",email:"nastasja@gmail.com",role:"User"},
      {id:2,name:"Jelena",password:"$2b$10$KAqfBRffi/i1tkkhegNWcu6vx8AfTL8zo/LzXllrzwQ27bvp6bVfe",email:"jelena@gmail.com",role:"Moderator"},
      {id:3,name:"Sara",password:"NSara2",email:"sara@gmail.com",role:"Admin"},
      {id:4,name:"Ognjen",password:"Ognjen2$2b$10$XG4UmNz7PuFZMnnULFZ4ge1NCHt8eNlONOxQyksPyJzPprh7OwnpO",email:"ognjen@gmail.com",role:"User"},
      {id:5,name:"Dusan",password:"$2b$10$dOyzQAtINktMmrOx5kTSB.eB2pmVwFSt58KZY8JawYm8zifGes0KC",email:"dusan@gmail.com",role:"User"},

    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
