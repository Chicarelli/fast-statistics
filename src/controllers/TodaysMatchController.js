const todaysMatch = require("../puppeteers/searchTodaysMatch");
const searchRealName = require("../puppeteers/searchForClassificationName");
const Match = require("../models/Match");

/* 
 * Controller Principal. 
 */
(async () => {
  let matches = await todaysMatch();

  /* 
  * Tratativa de nome do time. 
  */

  for(const indexChampionship in matches){
    for(const indexMatch in matches[indexChampionship].matches){
      
      console.log(`Procurando por: ${matches[indexChampionship].matches[indexMatch].homeTeam}`);
      matches[indexChampionship].matches[indexMatch].homeTeam = await searchRealName(matches[indexChampionship].matches[indexMatch].homeTeam, matches[indexChampionship].championshipName) || matches[indexChampionship].matches[indexMatch].homeTeam;
      console.log(`Resultado: ${matches[indexChampionship].matches[indexMatch].homeTeam}`);

      console.log(`Procurando por: ${matches[indexChampionship].matches[indexMatch].awayTeam}`);
      matches[indexChampionship].matches[indexMatch].awayTeam = await searchRealName(matches[indexChampionship].matches[indexMatch].awayTeam, matches[indexChampionship].championshipName) || matches[indexChampionship].matches[indexMatch].awayTeam
      console.log(`Resultado: ${matches[indexChampionship].matches[indexMatch].awayTeam}`);
    }
  }

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