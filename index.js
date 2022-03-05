const config = require('config');
const debug = require('debug')('app:startup');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

// require('dotenv').config();

const app = express(); 

require('./db/db');

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

  console.log(process.env.NODE_ENV);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    // console.log('morgan is enabled...');
    debug("morgan is enabled..."); // it's better than console.log();
}



const PORT = process.env.PORT || 5000;

app.use('/api/genres', require('./routes/genre/genreRoute'));


app.listen(PORT, () => console.log('Server start on port... ' + PORT))