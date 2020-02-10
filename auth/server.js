'use strict';

const express = require('express');
const basicAuth = require('./basic-auth-middleware.js');
const Users = require('./users.js');

const app = express();

app.use(express.json());

// echo '{"username":"john", "password":"blue"}' | http post :3000/signup
app.post('/signup', async (req, res) => {
  let user = new Users(req.body);
  user
    .save(req.body)
    .then(user => {
      // make a token
      let token = user.generateToken(user);
      res.status(200).send(token);
    })
    .catch(err => {
      console.error(err);
      res.status(403).send('You cannot do this');
    });
});

// http post :3000/signin -a john:hasadog
app.post('/signin', basicAuth, (req, res) => {
  res.status(200).send(req.token);
});

// app.get('/secretStuff', basicAuth, (req, res) => {
//   res.send('you got mail');
// });

module.exports = {
  start: port =>
    app.listen(port, () => console.log(`listening on port ${port}`)),
};
