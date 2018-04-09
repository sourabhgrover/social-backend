'use strict';
module.exports = (sequelize, DataTypes) => {
  var platform = sequelize.define('platform', {
    name: DataTypes.STRING,
    img_name: DataTypes.STRING
  }, {});
  platform.associate = function(models) {
    // associations can be defined here
  };
  return platform;
};