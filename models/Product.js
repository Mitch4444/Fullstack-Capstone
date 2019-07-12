'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  notes:{
    type: String,
    required: true
  },
  imageURL:{
    type: String,
    required: true
  },
  purchaseDate:{
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;