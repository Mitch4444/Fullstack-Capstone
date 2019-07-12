'use strict';

//****************************************************
// Require 
//****************************************************

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

//****************************************************
// Load Product Model to use
//****************************************************

require('../models/Product');
const Product = mongoose.model('products');


//****************************************************
// INDEX item page
//****************************************************

router.get('/', ensureAuthenticated, (req, res) => {
  Product.find({user: req.user.id})
    .sort({
      purchaseDate: 'desc'
    })
    .then(products => {

      let totalCost = 0;

      for (let i = 0; i < products.length; i++){
        totalCost += products[i].cost;
      }

      res.render('user/user', {
        products: products,
        totalCost: totalCost.toFixed(2)
      });
    });
});

//****************************************************
// CREATE 
//****************************************************

// Create Item Route
router.get('/createitem', ensureAuthenticated, (req, res) => {
  res.render('products/createItem');
});

// Create Item Post
router.post('/createitem', (req, res) => {
  let errors = [];

  // Product Name
  if (!req.body.productName) {
    errors.push({
      text: 'You must have a product name!'
    });
  }
  // Brand Name
  if (!req.body.brand) {
    errors.push({
      text: 'You must input the brand name!'
    });
  }
  // Cost of the product
  if (!req.body.cost) {
    errors.push({
      text: 'You must input the cost of the product!'
    });
  }
  // Product Quantity
  if (!req.body.quantity) {
    errors.push({
      text: 'You must input the quantity!'
    });
  }
  // Must have some kind of notes of the product
  if (!req.body.notes) {
    errors.push({
      text: 'Please input any kind of notes of the product'
    });
  }
  // Image must be URL
  if (!req.body.imageURL) {
    errors.push({
      text: 'Must have image of the product! Use Amazon Product URL'
    });
  }
  // Purchased Date
  if (!req.body.purchaseDate) {
    errors.push({
      text: 'Must input the purchase date of the product'
    });
  }

  if (errors.length > 0) {
    res.render('products/createItem', {
      errors: errors,
      productName: req.body.productName,
      brand: req.body.brand,
      cost: req.body.cost,
      quantity: req.body.quantity,
      notes: req.body.notes,
      imageURL: req.body.imageURL,
      purchaseDate: req.body.purchaseDate
    });
  } else {
    const newUser = {
      productName: req.body.productName,
      brand: req.body.brand,
      cost: req.body.cost,
      quantity: req.body.quantity,
      notes: req.body.notes,
      imageURL: req.body.imageURL,
      user: req.user.id,
      purchaseDate: req.body.purchaseDate
    }
    new Product(newUser)
      .save()
      .then(product => {
        req.flash('success_msg', 'Product was created!');
        res.redirect('/item');
      });
  }
});

//****************************************************
// READ 
//****************************************************

router.get('/:id', ensureAuthenticated, (req, res) => {
  Product.findOne({
    _id: req.params.id
  })
    .then(product => {
      if(product.user !== req.user.id){
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/item');
      } else{
        res.render('item', {
          product: product
        });
      } 
    });
});

//****************************************************
// UPDATE 
//****************************************************

// Link to edit
router.get('/:id/edit', ensureAuthenticated, (req, res) => {
  Product.findOne({
    _id: req.params.id
  })
    .then(product => {
      if(product.user !== req.user.id){
        req.flash('error_msg', 'Not Authorized');
        res.redirect('/item');
      } else{
        res.render('products/edit', {
          product: product
        });
      }  
    });
});

// Update Product
router.put('/:id', (req, res) => {
  Product.findOne({
    _id: req.params.id
  })
    .then(product => {
      // Updating values
      product.productName = req.body.productName;
      product.brand = req.body.brand;
      product.cost = req.body.cost;
      product.quantity = req.body.quantity;
      product.notes = req.body.notes;
      product.imageURL = req.body.imageURL;
      product.purchaseDate = req.body.purchaseDate;

      product.save()
        .then(product => {
          req.flash('success_msg', 'Product was updated!');
          res.redirect('/item');
        })
    });
});

//****************************************************
// DELETE 
//****************************************************

router.delete('/:id', (req, res) => {
  Product.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Product Deleted');
      res.redirect('/item');
    }); 
});


module.exports = router;

