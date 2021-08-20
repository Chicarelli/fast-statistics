const searchMatchTeams = require('../puppeteers/searchMatchTeams');
const MatchTeams = require("../models/Match_teams");
const Match = require('../models/Match');

const findMatchesTeamBasedOnMatch = async() => {
  const data = await Match.findAll();
  
  // data.map(item => {
  //   console.log(item.home_team, item.away_team, item.campeonato);
  // })

  for(const i in data){
    // console.log(data[i].home_team)
    const result = await searchMatchTeams(data[i].home_team, data[i].away_team, data[i].campeonato)
    console.log(data[i].campeonato, result);

    await createMatchTeam(data[i].id, data[i].campeonato ,result);
  }

};

const createMatchTeam = async(id, campeonato, data ) => {

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

    try{
      await newMatch.save();
    } catch (error) {
      console.log('Erro ao tentar salvar dados dos times das partidas', error);
    }
  })

}

findMatchesTeamBasedOnMatch();

module.exports = findMatchesTeamBasedOnMatch