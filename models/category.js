'use strict';
module.exports = (sequelize, DataTypes) => {
  var category = sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
            args: 3,
            msg: "Category Name must be atleast 3 characters in length"
        }
    }
    },
    img_name: DataTypes.STRING,
  }, {});
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};