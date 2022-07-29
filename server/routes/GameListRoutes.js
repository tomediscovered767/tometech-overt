/** API, gather, cache, and provide TomeDiscovered's list of games. */
const gameListDao = require('../services/database/dao/GameListDao.js');

let gameListCache = [];

module.exports = app => {
  app.get("/data/game-list/get-all", (req, res) => {
    if(gameListCache.length === 0){
      gameListDao.getAll()
      .then(result => {
        gameListCache = result;
        return res.status(200).json({
          code: 5, msg: "Success.",
          data: result,
          origin: "GameListRoutes /data/game-list/get-all"
        });
      })
      .catch(err => {
        return res.status(500).json({
          code: 5, msg: "Could not get game list from table. Error: "+err,
          origin: "GameListRoutes /data/game-list/get-all"
        });
      });
    }
    else{
      return res.status(200).json({
        code: 5, msg: "Success.",
        data: gameListCache,
        origin: "GameListRoutes /data/game-list/get-all"
      });
    }
  });
};
