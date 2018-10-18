'use strict';
const services = require('./services');
function setupRoutes (app) {
// mine a new block
  app.get('/mine', services.mineBlock);

  // add a new transaction
  app.post('/transactions/new', services.addNewTransaction);

  // get current blockChain
  app.get('/chain', services.getChain);

  // get pending transactions
  app.get('/pending-transactions', services.getPendingTransactions);

  // register a new node
  app.post('/nodes/register', services.registerNewNode);

  // resolve conflicts in the chain by coming to a consensus
  app.get('/nodes/resolve', services.resolveConflict);
}

module.exports = setupRoutes;
