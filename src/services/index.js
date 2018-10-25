const crypto = require('crypto');
const fs = require('fs');
const config = require('../config');

const testService = () => {
  return { message: 'test success' };
};

const requestSecureToken = () => {
  const publicKey = fs.readFileSync(config.get('publicKeyPath'), 'utf8');
  return Promise.resolve({
    token: crypto.randomBytes(64).toString('hex'),
    publicKey
  });
};
module.exports = {
  testService,
  requestSecureToken
};
