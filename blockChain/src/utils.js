const axios = require('axios');
const constants = require('./constants');

const registerNetworkNodes = async () => {
  const thisPort = +process.env.PORT;
  const nodesToRegister = constants.nodes.filter(node => node.port !== thisPort);
  const currentNode = constants.nodes.filter(node => node.port === thisPort)[0];
  const nodes = nodesToRegister.map(node => `${node.name}:${node.port}`);

  try {
    await axios.post(`http://${currentNode.name}:${currentNode.port}/nodes/register`, {
      nodes
    });
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(new Error(`failed to register network nodes: ${e.response.data.message}`));
  }
};

const getUTCTimeString = () => Math.round(new Date().getTime() / 1000).toString();

module.exports = {
  getUTCTimeString,
  registerNetworkNodes
};
