module.exports = () => {
    'use strict';
    return async function respond(req, res, next) {
        res.type('json');
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN")
        await next();
    };
};