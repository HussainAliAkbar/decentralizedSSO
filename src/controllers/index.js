const services = require('../services');

function testController (req, res, next) {
  let payload = {
  };
  return services.testService(payload)
    .then(res.json)
    .catch(res.json);
}

function requestSecureToken (req, res, next) {
  return services.requestSecureToken()
    .then(res.json)
    .catch(res.json);
}

function signUp (req, res, next) {
  const payload = {
    secureToken: req.body.secureToken
  };
  return services.signUp(payload)
    .then(res.json)
    .catch(res.json);
}

module.exports = {
  testController,
  requestSecureToken,
  signUp
};
