const express = require('express');
const Fawn = require("fawn");
const router = express.Router();

const { Customer } = require('../models/customerModel');
const { Movie } = require('../models/movieModel');
const {Rental, validateRental} = require('../models/rentalModel')

//transaction library
Fawn.init("mongodb://localhost/movieStore");


router.get("/", async (req, res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

router.post("/", async (req, res)=>{
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("Invalid customer.");

    const movie  = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Invalid moive");

    if(movie.numerInStock === 0) return res.status(400).send("Out of stock ");

    let rental = new Rental({
        customer:{
            _id: customer._id, 
            name: customer.name, 
            phone: customer.phone
        },
        movie:{
            _id: movie._id, 
            title: movie.title, 
            dailyRentalRate: movie.dailyRentalRate
        }
    })

    // followinge operations should be successful. if either one fails it would create 
    // inconsistency in db
        /** 
            rental =  await rental.save();
            movie.numerInStock--;
            movie.save();
        */
    // Or they should be atomic 
    // if rental is saved , then something happened and movie couldn't save.
    // it would create a inconsistency in our db
    // it's transation problem
    // fawn is npm library that helps to solve this problem.

    try {
      await  new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie.id}, {
                $inc:{
                    numberInStock: -1 // decrease numberInStock in db
                }
            })
            .run();

        return res.send(rental);      
    } catch (error) {
        console.log(error);
    }
});

module.exports = router ;