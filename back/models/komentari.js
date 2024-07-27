'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Komentaris extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Ocenas,Users,Restaurants}) {
      // define association here
      this.belongsTo(Ocenas,{foreignKey : 'ocenaID'})
      this.belongsTo(Users, {foreignKey : 'userID'})
      this.belongsTo(Restaurants, {foreignKey : 'restaurantID'})
    }
  }
  Komentaris.init({
    kontent: {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Komentaris',
  });
  return Komentaris;
};