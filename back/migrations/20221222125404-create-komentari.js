'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Komentaris', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userID :{
        type : DataTypes.INTEGER,
        allowNull : false
      },
      ocenaID :{
        type : DataTypes.INTEGER,
        allowNull : false
      },
      restaurantID :{
        type : DataTypes.STRING
      },
      kontent: {
          type : DataTypes.STRING,
          allowNull : false
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Komentaris');
  }
};