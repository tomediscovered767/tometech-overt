/** Methods for manipulation of the tometech_users table. */
const dbConnector = require('../DbConnector.js');

const insert = (username, email, password) => {
  return new Promise(function(resolve, reject) {
    dbConnector.getConnection((err, con) => {
      con.query("insert into tometech_users (name, email, password) values (?, ?, ?)",
      [username, email, password], (err, result, fields) => {
        if(err){
          return reject({
            code: 0, data: {username, email, password}, err: err,
            msg: "Could not insert user into table.",
            origin: "UsersDao.insert"
          });
        }
        resolve(result);
      });
    });
  });
};

const find = (username) => {
  return new Promise(function(resolve, reject) {
    dbConnector.getConnection((err, con) => {
      con.query("select * from tometech_users where name=?", [username],
      (err, result, fields) => {
        if(err){
          return reject({
            code: 0, data: username, err: err,
            msg: "Could not find user in table.",
            origin: "UsersDao.find"
          });
        }
        if(result.length === 0){
          return reject({
            code: 0, data: {username},
            msg: "User not found.",
            origin: "UsersDao.find"
          });
        }
        resolve({ userid:   result[0].userid, username: result[0].name,
                  email:    result[0].email,  password: result[0].password });
      });
    });
  });
};

/** t: exists, f: does not exist */
const checkUsername = (username) => {
  return new Promise(function(resolve, reject) {
    dbConnector.getConnection((err, con) => {
      con.query("select * from tometech_users where name=?", [username],
      (err, result, fields) => {
        if(err){
          return reject({
            code: 0, data: username, err: err,
            msg: "Could not check if username is in use.",
            origin: "UsersDao.checkUsername"
          });
        }
        resolve(result.length > 0);
      });
    });
  });
};

const lock = (userid) => {
  return new Promise(function(resolve, reject) {
    dbConnector.getConnection((err, con) => {
      let now = new Date().toISOString().slice(0, 19).replace('T', ' ');
      con.query("update tometech_users set locked_at=? where userid=?",
      [now, userid], (err, result, fields) => {
        if(err){
          return reject({
            code: 0, data: userid, err: err,
            msg: "Could not lock user.",
            origin: "UsersDao.lock"
          });
        }
        resolve(result);
      });
    });
  });
};

module.exports = { insert, find, checkUsername, lock };
