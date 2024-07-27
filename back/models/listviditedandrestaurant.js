'use strict';
const {
  Model, ForeignKeyConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListViditedAndRestaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ListVisiteds,Restaurants}) {
      // define association here
      this.belongsTo(ListVisiteds, {foreignKey : 'listVisitedID'})
      this.belongsTo(Restaurants, {foreignKey : 'restaurantID'})
    }
  }
  ListViditedAndRestaurants.init({
    datum: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ListViditedAndRestaurants',
  });
  return ListViditedAndRestaurants;
};