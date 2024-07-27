'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurants extends Model {
    static associate({Komentaris,ListViditedAndRestaurants,TypeOfRestaurants,Notifications,Locations,WeeksFavourites}) {
      this.hasMany(Komentaris , {foreignKey :'restaurantID', onDelete: 'cascade'})
      this.hasMany(ListViditedAndRestaurants, {foreignKey : 'restaurantID'})
      this.belongsTo(TypeOfRestaurants,{foreignKey:'typeID'})
      this.hasMany(Notifications, {foreignKey : 'restaurantID'})
      this.belongsTo(Locations,{foreignKey : 'locationID'})
      this.hasMany(WeeksFavourites,{foreignKey : 'restaurantID'})
    }
  }
  Restaurants.init({
    name: {
      type :DataTypes.STRING,
      allowNull : false
    },
    radnoVreme: {
      type :DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Restaurants',
  });
  return Restaurants;
};