const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String ,
        required: true, 
        minlength:3,
        maxlength:255, 
    },
    email:{
        type:String ,
        required: true, 
        unique:true, 
        minlength:5,
        maxlength:255, 
    },
    password:{
        type:String ,
        required: true, 
        minlength:5,
        maxlength:1024, 
    },
    isAdmin: Boolean 
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivatKey') );
    return token; 
}

const User = mongoose.model('User', userSchema);

//validate req body
function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
}

module.exports = {
    User, 
    validateUser 
}


// Authentication- if user is what he claims to be.
// Authorization- if user has all the permision to create or delete db 