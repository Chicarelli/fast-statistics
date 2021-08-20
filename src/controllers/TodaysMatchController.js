const todaysMatch = require("../puppeteers/searchTodaysMatch");
const Match = require("../models/Match");

/* 
 * Controller Principal. 
 */
(async () => {
  let matches = await todaysMatch();

  createMatches(matches);
  
})();

/*
 * Recebe resultado de todaysMatch e cria um registro no tabela Match no banco para cada resposta.
 */
const createMatches = async(matches) => {

  matches.forEach(async championship => {
    championship.matches.forEach(async match => {
      const newMatch = Match.build({
        home_team: match.homeTeam,
        away_team: match.awayTeam,
        date: new Date().toISOString(),
        status: 0,
        campeonato: championship.championshipName
      });
      try{
        await newMatch.save();
      } catch ( error ) {
        console.log('Erro ao tentar salvar partidas: ', error)
      }
    });
  })
}