'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type :DataTypes.STRING,
        allowNull : false
      },
      radnoVreme: {
        type :DataTypes.STRING,
        allowNull : false
      },
      typeID :{
        type : DataTypes.INTEGER
      },
      locationID:{
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
    await queryInterface.dropTable('Restaurants');
  }
};