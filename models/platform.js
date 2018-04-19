'use strict';
module.exports = (sequelize, DataTypes) => {
  var platform = sequelize.define('platform', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
            args: 3,
            msg: "Platform Name must be atleast 3 characters in length"
        }
    }
    },
    img_name: DataTypes.STRING,
    package_name_android: DataTypes.STRING,
    package_name_ios: DataTypes.STRING,
  }, {});

  platform.associate = function(models) {
    // associations can be defined here
  };
  return platform;
};