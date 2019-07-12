'use strict';

if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI:
    'mongodb://admin:password@ds049568.mlab.com:49568/trachyourtech'}
} else{
  module.exports = {mongoURI: 'mongodb://localhost/fullstack'}
}
