const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const routes = require('./routes');
const formatter = require('./responseFormatter');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const nodeIdentifier = uuidv4();

// setup a server

app.use(formatter.formatResponse);
app.listen(process.env.PORT, () => console.log('app listening on port: ', process.env.PORT, ', identifier: ', nodeIdentifier));
routes(app);
