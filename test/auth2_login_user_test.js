'use strict';

//  Requires
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');

// Chai Http
chai.use(chaiHttp);

// Require from App.js
const {
  app,
  runServer,
  closeServer
} = require('../app');

// Will be using this login Credentials
const userCredentials = {
  email: 'test@test.com',
  password: 'test'
};

// To Hold Auth User Login because of passport
const authenticatedUser = chai.request.agent(app);

describe('Login with auth user', () => {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should return a 200 response if the user is logged in plus should be at /item', function () {

    return authenticatedUser
      .post('/user/login')
      .send(userCredentials)
      .then(function (res) {
        authenticatedUser
          .get('/item')
          .then(function (res) {
            expect(res.statusCode === 200);
            expect(res.req.path === '/item');
          });
      });
  });
});