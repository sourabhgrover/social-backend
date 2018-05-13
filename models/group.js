module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('group', {
    group_url:{
      type: DataTypes.STRING,
      unique: true
    },
    name: DataTypes.STRING,
    img_name: DataTypes.STRING,
    platform_id: DataTypes.INTEGER
  }, {});
  group.associate = (models) => {
    // Association
     group.hasMany(models.group_relation, {foreignKey: 'group_id'});
     group.belongsTo(models.platform,{foreignKey: 'platform_id'});
  };
  return group;
};