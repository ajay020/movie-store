const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt  = require('bcrypt');
const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const {User, validateUser} = require('../models/userModel');

//get me 
router.get('/me',auth, async(req, res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/', async(req, res) =>{
    //check for bad request
    const {error} = validateUser(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   // check if user already registerd.
   let user = await User.findOne({email: req.body.email});
   if(user) return res.status(400).send('User with given email already registered.');

   //create user 
   user = new User(_.pick(req.body, ['name', 'email', 'password']));

   //hash password
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);

   await user.save();

   const token = user.generateAuthToken();

   res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router ;

// Information expert principle
