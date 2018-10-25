
'use strict';

const services = require('../services');

function testController (req, res, next) {
  let payload = {
    name: req.body.name
  };
  return services.testService(payload)
    .then(res.json)
    .catch(res.json);
}

module.exports = {
  testController
};
