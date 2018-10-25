'use strict';

module.exports = {
  pagination: {
    skip: 0,
    pageSize: 10
  },
  transactionType: {
    accountCreation: 'accountCreation',
    serviceRegistration: 'serviceRegistration'
  },
  accountType: {
    consumer: 'consumer',
    service: 'service'
  },
  nodes: [
    {
      name: 'node-1',
      port: 3000
    },
    {
      name: 'node-2',
      port: 3001
    },
    {
      name: 'node-3',
      port: 3002
    }
  ]
};
