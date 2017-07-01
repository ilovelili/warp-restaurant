// dev config
module.exports = {
    env: 'dev',
    log: {
        enabled: true,
        logLevel: 'dev', // Concise output colored by response status for development use.
    },
    database: "warp-dev",
    googlePlacesAPI: {
        key: "AIzaSyBNFF56h-R0Op9gcaTWmR9pVL2qCI3jJ6c", // api key provided by google
    },
};
