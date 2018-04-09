'use strict';
module.exports = (sequelize, DataTypes) => {
  var platform = sequelize.define('platform', {
    name: DataTypes.STRING,
    img_url: DataTypes.STRING
  }, {});
  platform.associate = function(models) {
    // associations can be defined here
  };
  return platform;
};