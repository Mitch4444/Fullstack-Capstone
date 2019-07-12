'use strict';

const assert = require('assert');
const Product = require('../models/Product');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Simply testing creating users without auth.
describe('Read Product(s)', () => {

  // After each test, drop the collection of products
  afterEach((done) => {
    mongoose.connection.collections.products.drop(() => {
      done();
    });
  });
  
  let pixelbook;
  
  // before each test, we will create a product to test with
  beforeEach((done) => {
    pixelbook = new Product({
      productName: 'PixelBook',
      brand: 'Google',
      cost: 1499.95,
      quantity: 1,
      notes: 'Creating a Pixelbook',
      imageURL: 'https://lh3.googleusercontent.com/ljctUOkW_wMToyxZo-LnXR3tZgl8wiljfDct60KnKBxxIRveY6yiD_8w4pKLCMIixLNBJ1KgNTSchuH4KZ9Ljq3WoCV0o7fQjOT2heE=s2048',
      purchaseDate: '05/10/2017',
      user: 'Jake'
    });

    pixelbook.save()
      .then(() => done());
  });
  
  it('finds all products with a name of pixelbook', (done) => {
    Product.find({
      productName: 'PixelBook'
    })
      .then((products) => {
        assert(products[0].productName === 'PixelBook');
        done();
      });
  });
});
