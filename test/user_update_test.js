'use strict';

const assert = require('assert');
const User = require('../models/User');

describe('Updating User(s)', () => {
  let jake;

  before((done) => {
    jake = new User({
      name: 'jake',
      email: 'jake@jake.com',
      password: 'jake'
    });

    jake.save()
      .then(() => done());
  });

  it('finds all user name jake and renames them to bobby', (done) => {
    User.update({ name: 'jake' }, { name: 'bobby' })
      .then(() => User.find({name: 'bobby'}))
      .then((users) => {
        assert(users[0].name === 'bobby');
        done();
      });
  });

  it('finds the user by email and update the email', (done) => {
    User.findOneAndUpdate({ email: 'jake@jake.com' }, { email: 'bobby@bobby.com' })
      .then(() => User.find({name: 'bobby'}))
      .then((users) => {
        assert(users[0].email === 'bobby@bobby.com');
        done();
      });
  });
});