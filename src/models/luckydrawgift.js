'use strict';
module.exports = (sequelize, DataTypes) => {
  const LuckyDrawGift = sequelize.define('LuckyDrawGift', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  LuckyDrawGift.associate = function(models) {
    // associations can be defined here
  };
  return LuckyDrawGift;
};
