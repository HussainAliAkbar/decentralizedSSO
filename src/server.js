'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const responseFormatter = require('./formatter/response');
const compression = require('compression');
const methodOverride = require('method-override');
const logger = require('./bootstrap/bunyan');
const routes = require('./routes');

const app = module.exports = express();

app.set('title', 'decentralizedSSO-API');
process.env.PORT = config.get('port');

// CORS middleware
let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(methodOverride());
app.use(compression());
app.use(allowCrossDomain);

app.use(responseFormatter.formatResponse);

// setup a server
app.listen(config.get('port'), () => logger.info('app listening on port: ', config.get('port')));
routes(app);
app.get('/ping', (req, res) => {
  res.send({ data: 'pong' });
});
