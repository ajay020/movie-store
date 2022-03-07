const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        trim:true 
    },
    phone:{
        type:String,
        required:true ,
        minlength:5,
        maxlength:50,
        trim:true 
    },
    isGold:{
        type:Boolean,
        default:false 
    },
});

//validateCustomer req body
const validateCustomer = (customer) =>{
    const schema = {
        name: Joi.string().min(5).max(5).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean() 
    }
    return Joi.validate(customer, schema);
}

const Customer = mongoose.model('Customer', customerSchema);
module.exports = {
    Customer, 
    validateCustomer
}