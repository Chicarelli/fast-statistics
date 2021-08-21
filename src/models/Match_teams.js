const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../../db");

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
  points: DataTypes.INTEGER,
  playedMatches: DataTypes.INTEGER,
  victory: DataTypes.INTEGER,
  draw: DataTypes.INTEGER,
  defeat: DataTypes.INTEGER,
  goalsMade: DataTypes.INTEGER,
  goalsAgainst: DataTypes.INTEGER,
  lastFive: DataTypes.STRING

}, { 
  tableName: 'match_teams',
  sequelize,
  modelName: 'Match_teams'
})
/* 
 * Adicionando novas coluna à tabela e sincronizando elas. 
 */
// const adapting = async () => {
//   Match_teams.sync({ alter: true });
// };
// adapting();

module.exports = Match_teams;