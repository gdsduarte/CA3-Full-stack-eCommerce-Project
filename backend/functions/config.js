const functions = require("firebase-functions");

const config = {
  PORT: functions.config().server.port || 8080,
  MONGODBURI: functions.config().mongodb.uri,
  DBNAME: functions.config().app.dbname,
  SECRET_KEY: functions.config().app.secret_key,
};

module.exports = config;
