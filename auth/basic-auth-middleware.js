'use strict';

const base64 = require('base-64');
const Users = require('./users.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('invalid login');
    return;
  }
  let basic = req.headers.authorization(' ').pop();
  let [user, password] = base64.decode(basic).split(':');

  Users.authenticateBasic(user, password)
    .then(validUser => {
      req.token = validUser.generateToken(validUser);
      next();
    })
    .catch(err => next(`Invalid Login! ${err}`));
};
