'use strict';
module.exports = (sequelize, DataTypes) => {
  const Awardee = sequelize.define('Awardee', {
    userId: DataTypes.INTEGER,
    awardId: DataTypes.INTEGER
  }, {});
  Awardee.associate = function(models) {
    Awardee.belongsTo(models.User);
    Awardee.belongsTo(models.Award);
  };
  return Awardee;
};
