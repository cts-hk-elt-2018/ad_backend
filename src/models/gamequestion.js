'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameQuestion = sequelize.define('GameQuestion', {
    question: DataTypes.STRING
  }, {});
  gameQuestion.associate = function(models) {
    // associations can be defined here
  };
  return GameQuestion;
};
