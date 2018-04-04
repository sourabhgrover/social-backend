'use strict';
module.exports = (sequelize, DataTypes) => {
  var group_relation = sequelize.define('group_relation', {
    group_id: DataTypes.STRING,
    platform_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {});
  group_relation.associate = function(models) {
    // associations can be defined here
  };
  return group_relation;
};