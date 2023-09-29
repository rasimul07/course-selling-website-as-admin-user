const jwt = require('jsonwebtoken');
const SECRET = 'secret34'

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(200);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };


  module.exports = {
    authenticateJwt,
    SECRET
  }