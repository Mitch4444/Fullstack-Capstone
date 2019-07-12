'use strict';

const assert = require('assert');
const User = require('../models/User');
const expect = require('chai').expect;

// Simply testing creating users without auth.
describe('Create User(s)', () => {
  it('saves a user', (done) => {
    const jake = new User({
      name: 'jake',
      email: 'jake@jake.com',
      password: 'jake'
    });
    // Saves the user to the db
    jake.save()
      .then(() => {
        // Has jake been saved successfully?
        assert(!jake.isNew);
        expect(jake.name).to.equal('jake');
        expect(jake.email).to.equal('jake@jake.com');
        done();
      });
  });
});
