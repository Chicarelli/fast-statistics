const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../../db");

class Match extends Model{}
  
Match.init({
  home_team: DataTypes.STRING,

  away_team: DataTypes.STRING,

  campeonato: DataTypes.STRING,

  date: DataTypes.DATE,

  status: DataTypes.INTEGER,
}, { 
  tableName: 'matches',
  sequelize,
  modelName: 'Match'
})

module.exports = Match;