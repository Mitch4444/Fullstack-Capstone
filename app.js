'use strict';

//****************************************************
// Requires 
//****************************************************

const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');

//****************************************************
// app  
//****************************************************

const app = express();

//****************************************************
// Loading Routes 
//****************************************************

const item = require('./routes/item');
const user = require('./routes/user');

//****************************************************
// Passport Config 
//****************************************************

require('./config/passport')(passport);

//****************************************************
// Database Config
//****************************************************

const db = require('./config/database');

//****************************************************
// Gets public static files 
//****************************************************

app.use(express.static(path.join(__dirname, '/public')));

//****************************************************
// Map global promise 
//****************************************************

mongoose.Promise = global.Promise;

//****************************************************
// Connec to mongoose
//****************************************************

mongoose.connect(db.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

// //****************************************************
// // Load Product Model 
// //****************************************************

// require('./models/Product');
// const Product = mongoose.model('products');

//****************************************************
// Middlewares
//****************************************************

// Handlebars-express
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body-parser 
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Method-override
app.use(methodOverride('_method'));

// Express Session 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect-Flash 
app.use(flash());

//****************************************************
// Global Variables 
//****************************************************

app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// ------------------
// ROUTES
// ------------------
// Index
app.get('/', (req, res) => {
  res.render('index');
});

//****************************************************
// Using Routes 
//****************************************************

app.use('/item', item);
app.use('/user', user);

// //****************************************************
// // Starting Server 
// //****************************************************

// const port = 5000;

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

//****************************************************
// Testing Server 
//****************************************************

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err);
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};