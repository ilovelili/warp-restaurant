const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const configs = require('./configs');

const api = require('./routes/api');
const healthcheck = require('./routes/healthcheck');

// middleware
const errors = require('./middlewares/errors');
const respond = require('./middlewares/respond');

const app = express();

// response interceptor
app.use(respond());
app.use(errors(configs));

if (configs.log.enabled) {
    app.use(logger(configs.log.logLevel || 'dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { etag: false }));

app.use('/health', healthcheck);
app.use('/api', api);

module.exports = app;