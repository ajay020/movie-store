const Joi = require('joi');
const express = require('express');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();
const {Genre, validate} = require('../models/genreModel');

//get all genres
router.get('/', async(req, res) =>{
    const genres = await Genre.find();
    res.status(200).send(genres);
});

//Create a genre
router.post('/', auth,async(req, res) =>{
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
router.put('/:id', auth, async(req, res) =>{

     //bad request
     const {error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new:true});

    if(!genre) return res.status(401).send("genre with given Id not found");
    res.status(200).send(result);
});

//delete a genre
router.delete('/:id', [auth, admin], async (req, res) =>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(401).send("genre with given Id not found");
    res.status(200).send(genre);
});

//get a genre witn and id
router.get('/:id', async(req, res) =>{
    const {id:genreId} = req.params;
    const genre = await Genre.findById(genreId);

    if(!genre) return res.status(401).send("genre with given Id not found");

    res.status(200).send(genre);
});


module.exports = router;