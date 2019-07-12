'use strict';

const assert = require('assert');
const User = require('../models/User');

describe('Delete User(s)', () => {
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


  it('finds all user name jake and will remove from db', (done) => {
    // Will remove all records with the user name 'jake'
    User.remove({ name: 'jake' })
      // tries to check if there is a user name 'jake'
      .then(() => User.findOne({ name: 'jake' }))
      .then((user) => {
        // checks to make sure that there is no one named 'jake'
        assert(user === null);
        done();
      });
  });

  // Finds the user name 'jake' by its id and remove from the db
  it('finds jake by its id and remove him from the db', (done) => {
    User.findByIdAndRemove(jake._id)
      .then(() => User.findOne({ name: 'jake' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});