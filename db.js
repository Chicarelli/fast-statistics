const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DATABASELOCALHOST,
  username: process.env.DATABASELOCALUSERNAME,
  password: process.env.DATABASELOCALPASSWORD,
  database: process.env.DATABASELOCALDATABASE
})

module.exports = sequelize;