'use strict';

//  Requires
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const User = require('../models/User');

// Chai Http
chai.use(chaiHttp);

// Require from App.js
const {
  app,
  runServer,
  closeServer
} = require('../app');

describe('Successfully register user', () => {

  // Creating a test user
  const registerUser = {
    name: 'Test',
    email: 'test@test.com',
    password: 'test',
    password2: 'test'
  };

  it('if user register successfully then will redirect to login', () => {
    return chai.request(app)
      .post('/user/register')
      .send(registerUser)
      .then(function (res) {
        expect(res.statusCode === 200);
        expect(res.req.path === '/user/login');
        User.findOne({
          name: 'Test'
        })
          .then((user) => {
            assert(user.name === 'Test');
          });
      });
  });
});