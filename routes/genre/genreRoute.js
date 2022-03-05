const Joi = require('joi');
const express = require('express');
const router = express.Router();
const Genre = require('../../models/genreModel');

//get all genres
router.get('/', async(req, res) =>{
    const genres = await Genre.find();
    res.status(200).send(genres);
});

//Create a genre
router.post('/', async(req, res) =>{
    //validate req body
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre( {
        name: req.body.name 
    });

    //create genre
    const result = await genre.save();
    res.status(200).send(result);
});

//update a genre
router.put('/:id', async(req, res) =>{

    // genre not found
    const {id:genreId} = req.params;
    const genre = await Genre.findById(genreId);

    if(!genre) return res.status(401).send("genre with given Id not found");

    //bad request
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //update genre
    genre.name = req.body.name;
    const result = await genre.save();
    res.status(200).send(result);
});

//delete a genre
router.delete('/:id', async (req, res) =>{
    const {id:genreId} = req.params;
    const genre = await Genre.findById(genreId);

    if(!genre) return res.status(401).send("genre with given Id not found");

    const result = await genre.remove();

    res.status(200).send(result);
});

//get a genre witn and id
router.get('/:id', async(req, res) =>{
    const {id:genreId} = req.params;
    const genre = await Genre.findById(genreId);

    if(!genre) return res.status(401).send("genre with given Id not found");

    res.status(200).send(genre);
});


//validate req body
const validate = (genre) =>{
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;