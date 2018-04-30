module.exports = (sequelize, DataTypes) => {
  const group_relation = sequelize.define('group_relation', {
    group_id: DataTypes.STRING,
    platform_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {});
  group_relation.associate = (models) => {
     // associations can be defined here
    //  group_relation.belongsTo(models.group,{foreignKey: 'group_id'});
        group_relation.belongsTo(models.category,{foreignKey: 'category_id'});
  };
  return group_relation;
};