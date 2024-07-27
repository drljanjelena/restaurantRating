'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Komentaris, ListVisiteds}) {
      this.hasMany(Komentaris, {foreignKey : 'userID' , onDelete : 'cascade', hooks : true})
      this.hasOne(ListVisiteds, {foreignKey : 'userID', onDelete : 'cascade', hooks : true})
    }
  }
  Users.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false
    },
    email: {
     type : DataTypes.STRING,
     allowNull : false
    },
    role : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};