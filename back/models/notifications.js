'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Restaurants, TypesOfNotifications}) {
      // define association here
      this.belongsTo(Restaurants, {foreignKey : 'restaurantID'})
      this.belongsTo(TypesOfNotifications, {foreignKey : 'typeNID'})
    }
  }
  Notifications.init({
    content: {
      type :DataTypes.STRING,
      allowNull : false
    },
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};