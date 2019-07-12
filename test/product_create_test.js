'use strict';

const assert = require('assert');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const expect = require('chai').expect;

mongoose.Promise = global.Promise;

// Simply testing creating users without auth.
describe('Create Product(s)', () => {

  // After each test, drop the collection of products
  afterEach((done) => {
    mongoose.connection.collections.products.drop(() => {
      done();
    });
  });

  it('creates one product', (done) => {
    const pixelbook = new Product({
      productName: 'PixelBook',
      brand: 'Google',
      cost: 1499.95,
      quantity: 1,
      notes: 'Creating a Pixelbook',
      imageURL: 'https://lh3.googleusercontent.com/ljctUOkW_wMToyxZo-LnXR3tZgl8wiljfDct60KnKBxxIRveY6yiD_8w4pKLCMIixLNBJ1KgNTSchuH4KZ9Ljq3WoCV0o7fQjOT2heE=s2048',
      purchaseDate: '05/10/2017',
      user: 'Jake'
    });
    // Saves the user to the db
    pixelbook.save()
      .then(() => {
        // Has pixelbook been saved successfully?
        assert(!pixelbook.isNew);
        expect(pixelbook.productName).to.equal('PixelBook');
        expect(pixelbook.brand).to.equal('Google');
        done();
      });
  });
});