'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    subscription: DataTypes.STRING,
    price: DataTypes.INTEGER,
    chargeDate: DataTypes.INTEGER,
    cardName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};