const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../../db");

class Last_matches extends Model{}
  
Last_matches.init({
  match_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'matches',
      key: 'id'
    },
    allowNull: false
  },
  team_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'match_teams',
      key: 'id'
    },
    allowNull: false
  },

  situation: DataTypes.STRING,
  teamName: DataTypes.STRING,
  teamAgainst: DataTypes.STRING,

  goalsMade: DataTypes.INTEGER,
  goalsTaken: DataTypes.INTEGER,

  corners: DataTypes.INTEGER,
  cornersAgainst: DataTypes.INTEGER,
  
  yellowCard: DataTypes.INTEGER,
  redCard: DataTypes.INTEGER,

  faultsMade: DataTypes.INTEGER,
  faultsTaken: DataTypes.INTEGER,
  
  result: DataTypes.STRING,

}, { 
  tableName: 'last_matches',
  sequelize,
  modelName: 'Last_matches'
})

module.exports = Last_matches;