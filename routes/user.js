'use strict';

//****************************************************
// Require 
//****************************************************

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require ('passport');
const router = express.Router();

//****************************************************
// Load Product Model 
//****************************************************

require('../models/User');
const User = mongoose.model('users');

//****************************************************
// User Login
//****************************************************

router.get('/login', (req, res) => {
  res.render('user/login');
});

// Login from POST
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/item',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req, res, next);
});


//****************************************************
// User Register
//****************************************************

router.get('/register', (req, res) => {
  res.render('user/register');
});

// Register form POST
router.post('/register', (req, res) => {
  let errors = [];

  if (req.body.password != req.body.password2) {
    errors.push({
      text: 'Passwords does not match'
    });
  }

  if (req.body.password.length < 4) {
    errors.push({
      text: 'Password must be at least 4 characters'
    });
  }

  if (errors.length > 0) {
    res.render('user/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({email: req.body.email})
      .then(user => {
        if (user) {
          req.flash('error_msg', 'Email already registered');
          res.redirect('/user/register');
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are registered. Thank you!');
                  res.redirect('/user/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      }); 
  }
});

//****************************************************
// User logout
//****************************************************

router.get('/logout', (req, res) =>{
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/user/login');
});

module.exports = router;