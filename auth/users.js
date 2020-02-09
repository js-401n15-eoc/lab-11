'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let secret = 'yourdoghasfleas';

let db = {};
let users = {};

// mongo pre-save
users.save = async function(record) {
  if (!db[record.username]) {
    record.password = await bcrypt.hash(record.password, 5);
    db[record.username] = record;
    return record;
  }
  return Promise.reject();
};

users.generateToken = function(user) {
  let userObject = {
    username: user.username,
  };

  let token = jwt.sign(userObject, secret);
  return token;
};

users.authenticateBasic = async function(username, password) {
  let valid = await bcrypt.compare(password, db[username].password);
  return valid ? Promise.resolve(db[username]) : Promise.reject();
};
module.exports = users;
