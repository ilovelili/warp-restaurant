/**
 * Places API
 * @GET /search search nearby restaurants
 * @GET /places get detailed info by placeID
 * 
 * Acutally we can directly use google places javascript lib on client side and make the application 'serverless'. But here we cache some data provided by google places api
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../configs');
const db = config.database;
const type = 'restaurant';
const http = require('http');
const querystring = require('querystring');
const key = config.googlePlacesAPI.key;

// MongoDB URL from the docker-compose file
const dbHost = `mongodb://database/${db}`;

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const placeSchema = new mongoose.Schema({
    placeId: String,
    rate: Number,
    reviews: Array,
    updated: Date,
});

// create mongoose model
const Place = mongoose.model('Place', placeSchema);

/* GET place. */
router.get('/places/:id', (req, res) => {
    // Place.findById(req.params.id, (err, places) => {
    //     if (err) res.status(500).send(error);

    //     res.status(200).json(places);
    // });
});

// /**
//  * search restaurants nearby using google places web service 
//  * acutally we can directly use google places javascript lib on client side
//  */
// router.get('/search', (req, res) => {
//     let options = {
//         host: 'maps.googleapis.com',
//         port: 443,
//         path: '/maps/api/place/nearbysearch/json/',
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         query: querystring.stringify({
//             location: req.params.location,
//             radius: req.params.radius,
//             type: type,
//             key: key,
//             keyword: req.params.keyword,
//         }),
//     };

//     // web request to google places nearbysearch web service
//     let request = http.request(options, (response) => {
//         let output = '';
//         response.setEncoding('utf-8');

//         res.on('data', function (chunk) {
//             output += chunk;
//         });

//         res.on('end', function () {
//             let obj = JSON.parse(output);
//             // done
//             res.status(200).json(obj)
//         });
//     });

//     request.on('error', function (err) {
//         res.send('error: ' + err.message);
//     });

//     request.end();
// });

module.exports = router;