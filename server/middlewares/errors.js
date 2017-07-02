module.exports = (configs) => {
    'use strict';
    return async function error(req, res, next) {
        try {
            // catch 404 and forward to error handler
            let err = new Error('Not Found');
            err.status = 404;
            await next();
            
        } catch (error) {
            res.locals.message = err.message;
            res.locals.error = configs.env === 'dev' ? err : {};

            res.status(err.status || 500);
            res.type('json');
            res.send(err);

            if (configs.log.enabled) {
                console.error(error);
            }
        }
    };
};