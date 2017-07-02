/**
 * Places API
 *  
 * @GET /places get placeResults (by id)
 * @POST /places create a placeResult
 * 
 * Acutally we can directly use google places javascript lib on client side and make the application 'serverless'. 
 * Here we cache some data provided by google places api since google place api usage limits
 * https://developers.google.com/places/web-service/usage
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../configs');
const db = config.database;
const type = 'restaurant';
const http = require('http');

// MongoDB URL from the docker-compose file
const dbHost = `mongodb://database/${db}`;

// create mongoose schema
const placeSchema = new mongoose.Schema({
    placeId: String,
    placeResult: Object,
    lastModified: Date,
});

// create mongoose model
const Place = mongoose.model('Place', placeSchema);

/* GET get placeResult */
router.get('/places', (req, res) => {
    'use strict';
    
    // Connect to mongodb
    mongoose.connect(dbHost);

    if (!req.query.placeId) {
        // find all
        Place.find({}, (err, places) => {
            if (err) res.status(500).send(error);
            res.status(200).json(places);
        });
    } else {
        // find by id
        Place.findOne({ placeId: req.query.placeId }, (err, places) => {
            if (err) res.status(500).send(error);
            res.status(200).json(places);
        });
    }
});

/* POST create a placeResult */
router.post('/places', (req, res) => {
    'use strict';
        
    // Connect to mongodb
    mongoose.connect(dbHost);

    let placeResult = req.body;
    let place = new Place({
        placeId: placeResult.place_id,
        placeResult: placeResult,
        lastModified: new Date(),
    });

    place.save(error => {
        if (error) res.status(500).send(error);
        res.status(201).json({
            success: true,
        });
    });
});

module.exports = router;