'use strict';
module.exports = (sequelize, DataTypes) => {
  var group = sequelize.define('group', {
    group_url: DataTypes.STRING,
    name: DataTypes.STRING,
    img_url: DataTypes.STRING,
    platform_id: DataTypes.INTEGER
  }, {});
  group.associate = function(models) {
    // associations can be defined here
  };
  return group;
};