'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeeksFavourites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Restaurants}) {
      // define association here
      this.belongsTo(Restaurants, {foreignKey : 'restaurantID'})
    }
  }
  WeeksFavourites.init({
    weekNo: {
      type :DataTypes.INTEGER,
      allowNull : false
    },
    date: {
      type :DataTypes.DATE,
      allowNull : false
    },
  }, {
    sequelize,
    modelName: 'WeeksFavourites',
  });
  return WeeksFavourites;
};