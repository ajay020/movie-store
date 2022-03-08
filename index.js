const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const debug = require('debug')('app:startup');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express(); 

require('./db/db');

//check if jwtPrivateKey is set
if(!config.get('jwtPrivatKey')){
    console.log("FATAL ERROR: jwt secret key is not found");
    process.exit(1); //exit with error code 
}

//body parser
app.use(express.json());
//serve static files from public folder
app.use(express.static('public'));
app.use(helmet());


//config
// console.log("App Name: " + config.get('name'));
// console.log("Male server: " + config.get('mail.host'));
// console.log("Mail password: " + config.get('mail.password'));

/**
 * 
  process.env.NODE_ENV => is undefindd if we don't set it
  app.get('env') return development if NODE_ENV is not set.
 */

//   console.log(process.env.NODE_ENV);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    // console.log('morgan is enabled...');
    debug("morgan is enabled..."); // it's better than console.log();
}

const PORT = process.env.PORT || 5000;

app.use('/api/genres', require('./routes/genreRoute'));
app.use('/api/customers', require('./routes/customerRoute'));
app.use('/api/movies', require('./routes/movieRoute'));
app.use('/api/rentals', require('./routes/rentalRoute'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));


app.listen(PORT, () => console.log('Server start on port... ' + PORT))