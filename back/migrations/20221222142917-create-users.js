'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataType) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
      },
      name: {
        type :DataType.STRING,
        allowNull : false
      },
      password: {
        type: DataType.STRING
      },
      email: {
        type: DataType.STRING
      },
      role : {
        type : DataType.STRING,
        allowNull : false
      },
      createdAt: {
        allowNull: true,
        type: DataType.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataType.DATE
      }
    });
  },
  async down(queryInterface, DataType) {
    await queryInterface.dropTable('Users');
  }
};