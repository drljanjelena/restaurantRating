'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListVisiteds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users,ListViditedAndRestaurants}) {
      // define association here
      this.belongsTo(Users,{foreignKey : 'userID'})
      this.hasMany(ListViditedAndRestaurants, {foreignKey : 'listVisitedID'})
    }
  }
  ListVisiteds.init({
    dateOfVisit: {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    sequelize,
    modelName: 'ListVisiteds',
  });
  return ListVisiteds;
};