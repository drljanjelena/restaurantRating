'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypesOfNotifications extends Model {
    /** typesofnotifications
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Notifications}) {
      // define association here
      this.hasMany(Notifications, {foreignKey : 'typeNID'})
    }
  }
  TypesOfNotifications.init({
    name: {
      type :DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'TypesOfNotifications',
  });
  return TypesOfNotifications;
};