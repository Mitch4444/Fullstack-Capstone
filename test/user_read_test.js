'use strict';

const assert = require('assert');
const User = require('../models/User');

describe('Read User(s)', () => {
  // Will create a user named Jake
  let jake;

  // before each test, we will create the user named Jake
  beforeEach((done) => {
    jake = new User({
      name: 'jake',
      email: 'jake@jake.com',
      password: 'jake'
    });

    jake.save()
      .then(() => done());
  });

  it('finds all users with a name of jake', (done) => {
    User.find({
      name: 'jake'
    })
      .then((users) => {
        // Finds the ID of the first Jake we find
        assert(users[0]._id.toString() === jake._id.toString());
        assert(users[0].name === 'jake');
        assert(users[0].email === 'jake@jake.com');
        done();
      });
  });

  it('find a user with a particular id and shows the info', (done) => {
    // finding the user info by jake's id
    User.findOne({
      _id: jake._id
    })
      .then((user) => {
        // Makes sure that ID found has the name 'jake'.
        assert(user.name === 'jake');
        assert(user.email === 'jake@jake.com');
        done();
      });
  });
});