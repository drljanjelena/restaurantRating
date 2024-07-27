'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ocenas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Komentaris}) {
      // define association here
      this.hasMany(Komentaris , {foreignKey : 'ocenaID'})
    }
  }
  Ocenas.init({
    ocena: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    opis: {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Ocenas',
  });
  return Ocenas;
};