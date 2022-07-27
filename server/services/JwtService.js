/** Common JsonWebToken methods, promisified. */
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const config = {
  accessExpiresIn: '30s',
  refreshExpiresIn: '10m'
};

const makeAccessToken = (userid) => {
  return jwt.sign(
    { userid: userid },
      process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: config.accessExpiresIn }
  );
};

const verifyAccessToken = token => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const makeRefreshToken = (userid) => {
  return jwt.sign(
    { jti: uuidv4(), userid: userid },
      process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: config.refreshExpiresIn }
  );
};

const verifyRefreshToken = (token, callback) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, callback);
};

const decodeToken = token => {
  console.log("decode", token)
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

const reqTokens = userid => {
  return new Promise(function(resolve, reject) {
    let accessToken  = makeAccessToken(userid);
    let refreshToken = makeRefreshToken(userid);
    let refTokenDecoded = decodeToken(refreshToken);

    // Place claims in blacklist / whitelist

    return resolve({ accessToken, refreshToken });
  });
};

const reqRefresh = oldToken => {
  return new Promise(function(resolve, reject) {
    verifyRefreshToken(oldToken, (verifyErr, data) => {
      if(verifyErr){
        return reject({
          code: 0, err: verifyErr, msg: "Invalid token.",
          origin: "JwtService.reqRefresh, verifyRefreshToken"
        });
      }

      let accessToken  = makeAccessToken(userid);
      let refreshToken = makeRefreshToken(userid);
      let refTokenDecoded = decodeToken(refreshToken);

      // Place claims in blacklist / whitelist

      return resolve({ accessToken, refreshToken });
    });
  });
};

let blacklist = [];

const blacklistToken = token => {
  if(!isBlacklisted(token)) blacklist.push(token);
};

const isBlacklisted = token => {
  if(token){
    blacklist.some(_token => {
      decodeToken(_token).jti == decodeToken(token).jti;
    });
  }
}

module.exports = { reqTokens, reqRefresh, decodeToken, blacklistToken, isBlacklisted, blacklist };
