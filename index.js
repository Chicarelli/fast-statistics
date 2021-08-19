const sequelize = require("./db");
/*
 * Testando conexão com o BD. 
 */
const connect = async() => {
  try{
    await sequelize.authenticate()
    console.log('conectado');
  } catch( error ) {
    console.log('ERRO: ', error);
  }
}
connect();