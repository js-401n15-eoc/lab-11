'use strict';

const express = require('express');
// const base64 = require('base-64');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const auth = require('./basic-auth-middleware.js');
const users = require('./users.js');

const app = express();

app.use(express.json());

// let secret = 'yourdoghasfleas';

// users database
// let users = {};

// echo '{"username":"john", "password":"blue"}' | http post :3000/signup
app.post('/signup', async (req, res) => {
  users
    .save(req.body)
    .then(user => {
      // make a token
      let token = users.generateToken(user);
      res.status(200).send(token);
    })
    .catch(err => {
      console.error(err);
      res.status(403).send('You cannot do this');
    });
  // let user = req.body;
  // if (!users[user.username]) {
  //   user.password = await bcrypt.hash(req.body.password, 5);
  //   users[user.username] = user;

  //   let userObject = {
  //     username: user.username,
  //     isGreat: true,
  //   };

  //   let token = jwt.sign(userObject, secret);

  //   res.status(200).send(token);
  // } else {
  //   res.status(403).send('username is already in use');
  // }
});

// http post :3000/signin -a john:hasadog
app.post('/signin', auth, (req, res) => {
  res.status(200).send(req.token);
});

// app.get('/secretStuff', auth, (req, res) => {});

module.exports = {
  start: port =>
    app.listen(port, () => console.log(`listening on port ${port}`)),
};
