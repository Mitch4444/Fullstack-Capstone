'use strict';

module.exports = {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } 
    req.flash('error_msg', 'Not Authorized, please login!');
    res.redirect('/user/login');
  } 
}