'use strict';

const express = require('express');
const base64 = require('base-64');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

// users database
let users = {};

// echo '{"username":"john", "password":"blue"}' | http post :3000/signup
app.post('/signup', async (req, res) => {
  let user = req.body;
  if (!users[user.username]) {
    user.password = await bcrypt.hash(req.body.password, 5);
    users[user.username] = user;

    let token = 'blahblahblah';
    res.status(200).send(token);
  } else {
    res.status(403).send();
  }
});

app.post('/signin', (req, res) => {});

module.exports = {
  start: port =>
    app.listen(port, () => console.log(`listening on port ${port}`)),
};
