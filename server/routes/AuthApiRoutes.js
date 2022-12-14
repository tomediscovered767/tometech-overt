/** API, Authenticate and verify users for data access */
const usersDao = require('../services/database/dao/UsersDao.js');
const jwtService = require('../services/JwtService.js');
const bcrypt = require('bcrypt');

module.exports = app => {

  app.post("/auth/sign-up", async (req, res) => {
    try{
      let inputData = { username: req.body.username, email: req.body.email,
                        password: await bcrypt.hash(req.body.password, 10) };

      usersDao.checkUsername(inputData.username)
      .then(usernameTaken => {
        if(usernameTaken){
          return res.status(409).json({
            code: 2, data: inputData.username,
            msg: "Username '"+inputData.username+"' is taken.",
            origin: "UserAuthRoutes /auth/sign-up, UsersDao.checkUsername"
          });
        }

        usersDao.insert(inputData.username, inputData.email, inputData.password)
        .then(insertResult => {
          if(insertResult.affectedRows === 0){
            return res.status(400).json({
              code: 3, data: inputData,
              msg: "Query successful. Did not insert new user into table.",
              origin: "UserAuthRoutes /auth/sign-up, UsersDao.insert"
            });
          }

          let memberRole = 100;
          usersDao.insertRole(insertResult.insertId, memberRole)
          .then(insertRoleResult => {
            if(insertRoleResult.affectedRows === 0){
              return res.status(400).json({
                code: 3, data: inputData,
                msg: "Query successful. Did not insert new user role into table.",
                origin: "UserAuthRoutes /auth/sign-up, UsersDao.insertRole"
              });
            }

            jwtService.reqTokens({userid: insertResult.insertId, roles: [memberRole]})
            .then(tokens => {
              return res.status(200).cookie("tometech_rfrsh",
                { token: tokens.refreshToken },
                { expires: new Date(Date.now()),
                  httpOnly: true, secure: true
                }).json({
                  code: 5, msg: "Success.",
                  data: { accessToken: tokens.accessToken },
                  origin: "UserAuthRoutes /auth/sign-in, jwtService.reqTokens"
                });
            })
            .catch(reqTokensErr => {
              return res.status(500).json(reqTokensErr);
            });
          })
          .catch(insertRoleErr => {
            return res.status(500).json(insertRoleErr);
          });
        })
        .catch(insertErr => {
          return res.status(500).json({
            code: 4, data: inputData, err: insertErr,
            msg: "Query unsuccessful. Could not insert user into table.",
            origin: "UserAuthRoutes /auth/sign-up, UsersDao.insert"
          });
        });
      })
      .catch(checkUsernameErr => {
        return res.status(500).json({
          code: 5, data: inputData.username, err: checkUsernameErr,
          msg: "Query unsuccessful. Could not check if username is taken.",
          origin: "UserAuthRoutes /auth/sign-up, UsersDao.checkUsername"
        });
      });
    } catch(bcryptHashError){
      return res.status(500).json({
        code: 6, err: bcryptHashError,
        msg: "Error hashing password.",
        origin: "UserAuthRoutes /auth/sign-up, try bcrypt.hash"
      });
    }
  });

  app.post("/auth/sign-in", (req, res) => {
    usersDao.find(req.body.username)
    .then(async (user) => {
      await bcrypt.compare(req.body.password, user.password)
      .then(compareResult => {
        if(!compareResult){
          return res.status(401).json({
            code: 2, msg: "Incorrect password.",
            origin: "UserAuthRoutes /auth/sign-in"
          });
        }

        jwtService.reqTokens({userid: user.userid, roles: user.roles})
        .then(tokens => {
          res.cookie("tometech_rfrsh", tokens.refreshToken,
            { expires: new Date(Date.now() + 9999999),
              httpOnly: true, secure: true
            });

          return res.status(200).json({
              code: 5, msg: "Success.",
              data: { accessToken: tokens.accessToken },
              origin: "UserAuthRoutes /auth/sign-in, jwtService.reqTokens"
            }).send();
        })
        .catch(reqTokensErr => {
          // console.log(reqTokensErr)
          return res.status(500).json(reqTokensErr);
        });
      })
      .catch(compareErr => {
        // console.log(compareErr)
        return res.status(401).json({
          code: 3, err: compareErr, msg: "Could not compare passwords.",
          origin: "UserAuthRoutes /auth/sign-in"
        });
      });
    })
    .catch(findErr => {
      // console.log(findErr)
      return res.status(401).json({
        code: 4, err: findErr,
        msg: "Query unsuccessful. Could not find user: "+req.body.username,
        origin: "UserAuthRoutes /auth/sign-in"
      });
    });
  });

  app.post("/auth/sign-out", (req, res) => {
    let cookies = req.cookies;
    if(req.cookies){
      let token = cookies.tometech_rfrsh;
      if(token){
        jwtService.blacklistToken(token);
      }
    }

    res.clearCookie("tometech_rfrsh", {httpOnly: true, secure: true});
    return res.status(200).json({
      code: 5, msg: "Success.",
      origin: "UserAuthRoutes /auth/sign-out"
    });
  });

  app.post("/auth/refresh", (req, res) => {
    let cookies = req.cookies;
    if(!req.cookies){
      return res.status(401).json({
        code: 5, msg: "Missing refresh.",
        origin: "UserAuthRoutes /auth/refresh"
      });
    }

    let token = cookies.tometech_rfrsh;

    if(!token){
      return res.status(401).json({
        code: 5, msg: "Missing token.",
        origin: "UserAuthRoutes /auth/refresh"
      });
    }

    if(jwtService.isBlacklisted(token)){
      res.clearCookie("tometech_rfrsh", {httpOnly: true, secure: true});
      return res.status(401).json({
        code: 5, msg: "Blacklisted token.",
        origin: "UserAuthRoutes /auth/refresh"
      });
    }

    jwtService.reqTokens(jwtService.decodeToken(token))
    .then(tokens => {
      res.cookie("tometech_rfrsh", tokens.refreshToken,
        { expires: new Date(Date.now() + 9999999),
          httpOnly: true, secure: true
        });

      return res.status(200).json({
          code: 5, msg: "Success.",
          data: { accessToken: tokens.accessToken },
          origin: "UserAuthRoutes /auth/refresh, jwtService.reqTokens"
        }).send();
    })
    .catch(reqTokensErr => {
      return res.status(500).json(reqTokensErr);
    });
  });
};
