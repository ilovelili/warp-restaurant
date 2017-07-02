/**
 * Simple endpoint for healthy checking
 */
const router = require('express').Router();

router.get('/', (req, res, next) => {
    'use strict';
    return res.json({
        healthy: true
    });
});

module.exports = router;