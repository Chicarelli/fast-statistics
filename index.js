const sequelize = require("./db");
const cron = require("node-cron");
const todaysMatch = require("./src/controllers/TodaysMatchController");
const matchController = require("./src/controllers/MatchTeamsController");
const lastMatches = require("./src/controllers/LastMatchesController");
/*
 * Testando conexão com o BD. 
 */

const connect = async() => {
  try{
    await sequelize.authenticate()
    await todaysMatch();
    await matchController();
    await lastMatches();
  } catch( error ) {
    console.log('ERRO: ', error);
  }
};
connect();

cron.schedule("0 0 */1 * *", async() => {
  try{
    await todaysMatch();
    await matchController();
    await lastMatches();

    console.log('Done');
  } catch (error) {
    console.log('ERRO!', error);
  }

}, {
  timezone: "America/Sao_Paulo"
})