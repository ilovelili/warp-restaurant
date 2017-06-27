module.exports = () => {
    return async function respond(req, res, next) {
        res.type('json');
        res.header("Access-Control-Allow-Origin", "http://localhost:4200")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        await next();
    };
};