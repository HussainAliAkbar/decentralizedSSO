const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const routes = require('./routes');
const formatter = require('./responseFormatter');
const utils = require('./utils');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const nodeIdentifier = uuidv4();

// setup a server

app.use(formatter.formatResponse);
app.listen(process.env.PORT, async () => {
  console.log('app listening on port: ', process.env.PORT, ', identifier: ', nodeIdentifier);
  routes(app);
  await utils.registerNetworkNodes();
});

// TODO: 1. implement mining after each transaction for simplification
// TODO: 3. implement scheduler which runs the consensus protocol after every minute
