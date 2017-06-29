const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../configs').database;

// MongoDB URL from the docker-compose file
const dbHost = `mongodb://database/${db}`;

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const placeSchema = new mongoose.Schema({
    placeId: String,
    rate: Number,
    reviews: Object[],
    updated: Date,
});

// create mongoose model
const Place = mongoose.model('Place', placeSchema);

/* GET place. */
router.get('/places/:id', (req, res) => {
    Place.findById(req.param.id, (err, places) => {
        if (err) res.status(500).send(error);

        res.status(200).json(places);
    });
});

/* update a place review. */
router.put('/places/:id', (req, res) => {
    // let user = new User({
    //     name: req.body.name,
    //     age: req.body.age
    // });

    // user.save(error => {
    //     if (error) res.status(500).send(error);

    //     res.status(201).json({
    //         message: 'User created successfully'
    //     });
    // });
});

module.exports = router;