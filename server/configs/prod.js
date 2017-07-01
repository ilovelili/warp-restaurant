// prod config
module.exports = {
    env: 'prod',
    log: {
        enabled: true,
        logLevel: 'common', // Standard Apache common log output.
    },
    database: "warp",
    googlePlacesAPI: {
        key: "AIzaSyBNFF56h-R0Op9gcaTWmR9pVL2qCI3jJ6c", // api key provided by google
    },
};