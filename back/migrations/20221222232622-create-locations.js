'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      street: {
        type :DataTypes.STRING,
        allowNull : false
      },
      number: {
        type : DataTypes.STRING,
        allowNull : false
      },
      city: {
        type : DataTypes.STRING,
        allowNull : false
      },
      zipnumber: {
        type : DataTypes.INTEGER,
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
    await queryInterface.dropTable('Locations');
  }
};