'use strict';
module.exports = (sequelize, DataTypes) => {
  var Platform = sequelize.define('Platform', {
    name: DataTypes.STRING,
    img_url: DataTypes.STRING
  }, {});
  Platform.associate = function(models) {
    // associations can be defined here
  };
  return Platform;
};