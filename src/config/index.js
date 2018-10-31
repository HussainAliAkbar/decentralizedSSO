'use strict';

const path = require('path');
const convict = require('convict');

let config = convict({
  env: {
    docs: 'Application development Environment',
    format: ['dev', 'prod', 'local'],
    default: 'local',
    env: 'NODE_ENV'
  },
  port: {
    docs: 'Default port on which the app runs',
    format: 'port',
    default: 4000
  },
  isReqResLogEnabled: {
    docs: 'Request / Response logger bit',
    format: '*',
    default: false
  },
  logs: {
    directory: {
      doc: 'Logs directory',
      format: String,
      default: path.join(__dirname, '../logs/')
    }
  },
  publicKeyPath: {
    doc: 'public key path',
    format: String,
    default: ''
  },
  privateKeyPath: {
    doc: 'private key path',
    format: String,
    default: ''
  },
  blockChainUrl: {
    dock: 'url for the blockChain',
    format: String,
    default: ''
  }
});

// Get config according to current environment
let env = config.get('env');

config.loadFile(path.resolve(`${__dirname}/env/${env}.json`));

// Validate config
config.validate({ strict: true });

module.exports = config;
