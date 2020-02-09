'use strict';

const express = require('express');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

let secret = 'yourdoghasfleas';

// users database
let users = {};

// echo '{"username":"john", "password":"blue"}' | http post :3000/signup
app.post('/signup', async (req, res) => {
  let user = req.body;
  if (!users[user.username]) {
    user.password = await bcrypt.hash(req.body.password, 5);
    users[user.username] = user;

    let userObject = {
      username: user.username,
      isGreat: true,
    };

    let token = jwt.sign(userObject, secret);

    res.status(200).send(token);
  } else {
    res.status(403).send('username is already in use');
  }
});

// http post :3000/signin -a john:hasadog
app.post('/signin', async (req, res) => {
  // console.log(req.headers.authorization);
  let basic = req.headers.authorization(' ').pop();
  let [user, password] = base64.decode(basic).split(':');

  let verified = user[user]
    ? await bcrypt.compare(password, users[user].password)
    : false;

  if (verified) {
    let userObject = {
      username: user.username,
      isGreat: true,
    };

    let token = jwt.sign(userObject, secret);

    res.status(200).send(token);
  } else {
    res.status(403).send('Access Denied');
  }
  res.send('ok');
});

app.get('/secretStuff', auth, (req, res) => {});

module.exports = {
  start: port =>
    app.listen(port, () => console.log(`listening on port ${port}`)),
};
