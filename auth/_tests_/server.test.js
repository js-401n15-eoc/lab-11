const supergoose = require('@code-fellows/supergoose');
const server = require('../server.js');
const agent = supergoose(server.authServer);

describe('signup', () => {
  let signinObj;

  beforeEach(() => {
    signinObj = {
      username: 'john',
      password: 'blue',
    };
  });

  it('can allow a new user to sign up', () => {
    return agent
      .post('/signup')
      .send(signinObj)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
