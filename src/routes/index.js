'use strict';
const controllers = require('../controllers');
function setupRoutes (app) {
  app.get('/test', controllers.testController);
}

module.exports = setupRoutes;
