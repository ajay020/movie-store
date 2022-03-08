const express = require('express');
const auth = require('../middleware/auth');
const { Genre } = require('../models/genreModel');
const router = express.Router();

const {Movie, validateMovie} = require('../models/movieModel');

router.get('/', async(req, res)=>{
    const movies = await Movie.find();
    res.send(movies);
})

router.post("/", auth, async (req, res)=>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre  = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid Genre");

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name 
        }, 
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate 
    })
    
    /** 
     *  object id is created by mongodb driver  before 
     *  saving the document to db, mongoose communicate to mongodb driver  and set id.
     * so even before saving the movie object, Its id property is created.
    */

    await movie.save();
    res.send(movie);
});


module.exports = router; 