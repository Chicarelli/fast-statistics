// const todaysMatch = require("../puppeteers/searchTodaysMatch");
const todaysMatch = require('../puppeteers/todaysMatch');
const Match = require("../models/Match");

const championshipsToSearch = [
  'La liga',
  'Premier League',
  'Brasileirão', 
  'Brasileirão Série B',
  'Italia Série A',
  'Bundesliga',
  'Superliga Argentina',
  'Ligue 1 França',
  'Primera A Colombia',
  'Primera Liga Portugal',
  'Escócia Premiership',
  'Holanda Eredivisie',
  'EUA MLS',
  'Austria bundesliga',
  'Bélgica Primeira Divisao A',
  'Chile Primera Division',
  'Superligaen Dinamarca',
  'J League',
  'Liga MX',
  'Noruega Eliteserien',
  '1 division peru',
  'Ekstraklasa Polonia',
  'Suécia Allsvenskan',
  'Suiça Super league',
  


];

/* 
 * Controller Principal. 
 */
const todaysMatchController = async () => {
  const matches = [];

  for(const i in championshipsToSearch){
    let championship = championshipsToSearch[i];
    match = await todaysMatch(championship);
    console.log(match);
    matches.push({
      championship,
      matches: match,
    })
  };

  console.log(matches);
  await createMatches(matches);
  return;  
};

/*
 * Recebe resultado de todaysMatch e cria um registro no tabela Match no banco para cada resposta.
 */
const createMatches = async(matches) => {

  for (const i in matches){
    let championship = matches[i].championship;
    let matchs = matches[i].matches;
    for (const i in matchs){
      let match = matchs[i];
      const newMatch = Match.build({
        home_team: match.homeTeam,
        away_team: match.awayTeam,
        date: new Date().toISOString(),
        status: 0,
        campeonato: championship
      });
      console.log(newMatch);
      try{
        await newMatch.save();
      } catch ( error ) {
        console.log('Erro ao tentar salvar partidas: ', error)
      }
    }
  }

  return;
  // matches.forEach(async championship => {
  //   //Provavelmente trocando por for in resolveria... Ou promise.all em matches.forEach.
  //   championship.matches.forEach(async match => {
  //     const newMatch = Match.build({
  //       home_team: match.homeTeam,
  //       away_team: match.awayTeam,
  //       date: new Date().toISOString(),
  //       status: 0,
  //       campeonato: championship.championshipName
  //     });
  //     try{
  //       await newMatch.save();
  //     } catch ( error ) {
  //       console.log('Erro ao tentar salvar partidas: ', error)
  //     }
  //   });
  // });
  // return;
}
module.exports = todaysMatchController;