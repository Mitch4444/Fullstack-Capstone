'use strict';

const assert = require('assert');
const Product = require('../models/Product');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Simply testing creating users without auth.
describe('Update a Product', () => {

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

  it('finds all product name PixelBook and renames them to PixelBook 2', (done) => {
    Product.update({ productName: 'PixelBook' }, { productName: 'PixelBook 2' })
      .then(() => Product.find({}))
      .then((products) => {
        // Makes sure we have exactly one product
        // since we created only one product
        assert(products.length === 1);
        // Makes sure the first product found is PixelBook 2
        assert(products[0].productName === 'PixelBook 2');
        done();
      });
  });

  it('finds one product by name and updates the name', (done) => {
    Product.findOneAndUpdate({ productName: 'PixelBook' }, { productName: 'PixelBook 2'})
      .then(() => Product.find({}))
      .then((products) => {
        // Makes sure we have exactly one product
        // since we created only one product
        assert(products.length === 1);
        // Makes sure the first product found is PixelBook 2
        assert(products[0].productName === 'PixelBook 2');
        done();
      });
  });

  it('finds by product id and updates the product name', (done) => {
    Product.findByIdAndUpdate(pixelbook._id, { productName: 'PixelBook 2' })
      .then(() => Product.find({}))
      .then((products) => {
        // Makes sure we have exactly one product
        // since we created only one product
        assert(products.length === 1);
        // Makes sure the first product found is PixelBook 2
        assert(products[0].productName === 'PixelBook 2');
        done();
      });
  });
});
