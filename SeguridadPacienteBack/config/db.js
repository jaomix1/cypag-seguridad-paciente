/* eslint-disable no-console */
require("dotenv").config();
const { Sequelize } = require("sequelize");

const user = process.env.USER;
const password = process.env.PASS;
const host = process.env.SERVER_SQL;
const database = process.env.BD;
const dialect = process.env.DIALECT;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
});

const connectDatabase = async () => {
  // Recuerda usar el config.env
  await sequelize
    .authenticate()
    .then(() => {
      console.log("DB CONNECTED SUCCESSFULLY");
    })
    .catch((error) => {
      console.log(`Error en la conexion: ${error}`);
    });
};

const config = {
  user,
  password,
  server: host,
  database,
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

module.exports = { connectDatabase, sequelize, config };
