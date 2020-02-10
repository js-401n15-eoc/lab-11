const supergoose = require('@code-fellows/supergoose');
const server = require('../server.js');
const agent = supergoose(server.authServer);
const Users = require('../models/users.js');
const base64 = require('base-64');

describe('auth server', () => {
  let signinObj;

  beforeEach(async () => {
    signinObj = {
      username: 'john',
      password: 'blue',
    };

    await Users.deleteMany({}).exec();
  });

  it('can allow a new user to sign up', () => {
    return agent
      .post('/signup')
      .send(signinObj)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  it('can allow an existing user to sign in', () => {
    return agent
      .post('/signup')
      .send(signinObj)
      .then(() => {
        const autHeader = base64.encode(
          `${signinObj.username}:${signinObj.password}`,
        );

        return agent
          .post('/signin')
          .set('authorization', autHeader)
          .then(response => {
            expect(response.statusCode).toBe(200);
          });
      });
  });
});
