'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('WeeksFavourites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      weekNo: {
        type :DataTypes.INTEGER,
        allowNull : false
      },
      date: {
        type :DataTypes.DATE,
        allowNull : false
      },
      restaurantID:{
        type : DataTypes.INTEGER
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
    await queryInterface.dropTable('WeeksFavourites');
  }
};