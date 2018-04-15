'use strict';
module.exports = (sequelize, DataTypes) => {
  var platform = sequelize.define('platform', {
    name: DataTypes.STRING,
    img_name: DataTypes.STRING,
    package_name_android: DataTypes.STRING,
    package_name_ios: DataTypes.STRING,
  }, {});
  platform.associate = function(models) {
    // associations can be defined here
  };
  return platform;
};