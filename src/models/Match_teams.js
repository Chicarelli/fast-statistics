const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../db");

class Match_teams extends Model{}
  
Match_teams.init({
  match_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'matches',
      key: 'id'
    },
    allowNull: false
  },
  name: DataTypes.STRING,
  campeonato_classificacao: DataTypes.STRING,

}, { 
  tableName: 'match_teams',
  sequelize,
  modelName: 'Match_teams'
})

module.exports = Match_teams;