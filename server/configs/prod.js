// prod config
module.exports = {
    env: 'prod',
    log: {
        enabled: true,
        logLevel: 'common', // Standard Apache common log output.
    },
    database: "warp",
};