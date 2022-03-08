const Joi = require('joi');
const config = require('config');
const _ = require('lodash');
const bcrypt  = require('bcrypt');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {User} = require('../models/userModel');


router.post('/', async(req, res) =>{
    //check for bad request
   const {error} = validateUser(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   //check if email exists in db
   let user = await User.findOne({email: req.body.email});
   if(!user) return res.status(400).send('Invalid email or password');

   //check if password is valid
   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword) return res.status(400).send('Invalid email or password');

   const token = user.generateAuthToken();
   
   res.send(token);
});

//validate req body
function validateUser(req){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);
}

module.exports = router ;