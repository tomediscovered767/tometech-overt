/** Mysql connection pool for database access */

const mysql = require("mysql2");
const parseDbUrl = require("parse-database-url");
const conf = parseDbUrl(process.env.CLEARDB_DATABASE_URL);

module.exports = mysql.createPool({
  host:     conf.host,
  user:     conf.user,
  password: conf.password,
  database: conf.database
});
