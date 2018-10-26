'use strict';
const controllers = require('../controllers');
function setupRoutes (app) {
  app.get('/test', controllers.testController);

  app.get('/request-secure-token', controllers.requestSecureToken);

  app.post('/sign-up', controllers.signUp);
}

module.exports = setupRoutes;
