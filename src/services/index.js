const crypto = require('crypto');
const axios = require('axios');
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

const signUp = async (payload) => {
  const secureToken = payload.secureToken;
  const response = await axios.post(`http://${config.get('blockChainUrl')}/fetch-by-secure-token`, {
    secureToken
  });
  return response.data;
};

module.exports = {
  testService,
  requestSecureToken,
  signUp
};
