'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Restaurants}) {
      // define association here
      this.hasOne(Restaurants, {foreignKey : 'locationID'})
    }
  }
  Locations.init({
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
    }
  }, {
    sequelize,
    modelName: 'Locations',
  });
  return Locations;
};