/** Methods for manipulation of the tometech_gamelist table. */
const dbConnector = require('../DbConnector.js');

const getAll = () => {
  return new Promise(function(resolve, reject) {
    dbConnector.getConnection((err, con) => {
      con.query("select * from tometech_gamelist",
      (err, result, fields) => {
        if(err){
          return reject({
            code: 0, data: { gameConsole, name }, err: err,
            msg: "Could not get games from GameList table.",
            origin: "GameListDao.getAll"
          });
        }

        resolve({ list: result });
      });
    });
  });
};

const findGame = (gameConsole, name) => {
  return new Promise(function(resolve, reject) {
    dbConnector.getConnection((err, con) => {
      con.query("select * from tometech_gamelist where console=? and name=?",
      [gameConsole, name],
      (err, result, fields) => {
        if(err){
          return reject({
            code: 0, data: { gameConsole, name }, err: err,
            msg: "Could not find game in table.",
            origin: "GameListDao.findGame"
          });
        }
        if(result.length === 0){
          return reject({
            code: 0, data: { gameConsole, name },
            msg: "Game not found.",
            origin: "GameListDao.findGame"
          });
        }
        resolve({ gameConsole: result[0].console, name: result[0].name });
      });
    });
  });
};

module.exports = { getAll, findGame };
