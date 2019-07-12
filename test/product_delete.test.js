'use strict';

const assert = require('assert');
const Product = require('../models/Product');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Simply testing creating users without auth.
describe('Delete Product(s)', () => {

  // After each test, drop the collection of products
  afterEach((done) => {
    mongoose.connection.collections.products.drop(() => {
      done();
    });
  });
  
  let pixelbook;
  
  // before each test, we will create the user named Jake
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

  
  it('finds all product name pixelbook and will remove from db', (done) => {
    // Will remove all records with the user name 'jake'
    Product.remove({ productName: 'PixelBook' })
      // tries to check if there is a user name 'jake'
      .then(() => Product.findOne({ productName: 'PixelBook' }))
      .then((product) => {
        // checks to make sure that there is no one named 'jake'
        assert(product === null);
        done();
      });
  });

  // Finds the user name 'jake' by its id and remove from the db
  it('finds PixelBook by its id and remove item from the db', (done) => {
    Product.findByIdAndRemove(pixelbook._id)
      .then(() => Product.findOne({ productName: 'PixelBook' }))
      .then((product) => {
        assert(product === null);
        done();
      });
  });
});
