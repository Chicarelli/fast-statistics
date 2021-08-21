const searchMatchTeams = require('../puppeteers/searchMatchTeams');
const MatchTeams = require("../models/Match_teams");
const Match = require('../models/Match');

const findMatchesTeamBasedOnMatch = async () => {
  /* 
   * status = 0; Jogos que ainda não foram procurados. 
   */
  const data = await Match.findAll({
    where: {
      status: 0
    }
  });

  if(data.length == 0){
    console.log('Não existem partidas!');
    return;
  }

  for (const i in data) {
    // console.log(data[i].home_team)
    const result = await searchMatchTeams(data[i].home_team, data[i].away_team, data[i].campeonato)

    await createMatchTeam(data[i].id, data[i].campeonato, result);
  }

  /* 
   * Atualizar status de match para identificar que foram procurados.  
   */

  for(const i in data) {
    const newInstanceOfMatch = await Match.findOne({where: {id: data[i].id}});
    newInstanceOfMatch.status = 1;
    await newInstanceOfMatch.save();
  }

};

const createMatchTeam = async (id, campeonato, data) => {

  data.forEach(async team => {
    const newMatch = MatchTeams.build({
      match_id: id,
      name: team.teamName,
      campeonato_classificacao: campeonato,
      points: team.points,
      playedMatches: team.playedMatches,
      victory: team.victory,
      draw: team.draw,
      defeat: team.defeat,
      goalsMade: team.goalsMade,
      goalsAgainst: team.goalsAgainst,
      lastFive: team.lastFive
    });

    try {
      await newMatch.save();
    } catch (error) {
      console.log('Erro ao tentar salvar dados dos times das partidas', error);
    }
  })

}

findMatchesTeamBasedOnMatch();

module.exports = findMatchesTeamBasedOnMatch