const express = require('express');
const router = express.Router();
const {Customer, validateCustomer} = require('../models/customerModel');

//get all customers
router.get('/', async(req, res) =>{
    const customers = await Customer.find();
    res.status(200).send(customers);
});

//Create a Customer
router.post('/', async(req, res) =>{
    //validate req body
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = new Customer( {
        name: req.body.name ,
        phone: req.body.phone,
        isGold: req.body.isGold 
    });

    //create Customer
    const result = await customer.save();
    res.status(200).send(result);
});

//update a customer
router.put('/:id', async(req, res) =>{

     //bad request
     const {error} = validateCustomer(req.body);
     if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {...req.body}, {new:true});

    if(!customer) return res.status(401).send("customer with given Id not found");
    res.status(200).send(result);
});

//delete a customer
router.delete('/:id', async (req, res) =>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(401).send("customer with given Id not found");
    res.status(200).send(result);
});

//get a customer witn and id
router.get('/:id', async(req, res) =>{
    const {id:genreId} = req.params;
    const customer = await Customer.findById(genreId);

    if(!customer) return res.status(401).send("customer with given Id not found");
    res.status(200).send(customer);
});


module.exports = router;