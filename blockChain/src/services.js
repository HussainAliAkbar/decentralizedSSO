const blockChain = require('./blockchain');

function mineBlock (req, res, next) {
  let lastBlock = blockChain.lastBlock();
  let lastProof = lastBlock['proof'];
  let lastHash = lastBlock['previousHash'];
  // we are doing this to tie the transaction history with the proof
  // this way no one would be able to rewrite the transaction history from scratch.
  //  This way, proofs of work can not be recycled on other chains.
  // for reference: https://medium.com/@schubert.konstantin/isnt-there-a-msitake-with-your-proof-of-work-30cf9467f0a5
  let proof = blockChain.proofOfWork(lastProof + lastHash);
  const previousHash = blockChain.hash(lastBlock);
  console.log('previous hash while adding block: ', previousHash);
  const block = blockChain.newBlock(proof, previousHash);
  return res.send({
    message: 'new block forged',
    index: block['index'],
    transactions: block['transactions'],
    proof: block['proof'],
    previousHash: block['previousHash']
  });
}

async function addNewTransaction (req, res, next) {
  const requiredFields = ['publicKey', 'encryptedData', 'broadcast'];
  let throwError = false;
  requiredFields.forEach(field => {
    if (!req.body[field] && req.body[field] !== false) {
      throwError = true;
    }
  });
  if (throwError) {
    res.status(400);
    return res.send({ message: 'required fields missing' });
  }
  let transactionAlreadyExistsOnTheChain = blockChain.fetchTransactionFromChain(req.body.publicKey);
  let transactionAlreadyInProcess = blockChain.fetchTransactionFromPendingTransactions(req.body.publicKey);
  if (transactionAlreadyExistsOnTheChain) {
    res.status(400);
    return res.send({ message: 'transaction already exists on the blockChain' });
  }
  if (transactionAlreadyInProcess) {
    res.status(400);
    return res.send({ message: 'transaction is already in process' });
  }

  let index;
  try {
    index = blockChain.newTransaction(req.body.publicKey, req.body.encryptedData);
    if (req.body.broadcast) {
      await blockChain.broadcastTransaction(req.body.publicKey, req.body.encryptedData);
    }
  } catch (e) {
    res.status(500);
    return res.send({ message: e.message });
  }
  return res.send({ message: `transaction will be added to block: ${index}` });
}

function getChain (req, res, next) {
  return res.send({
    chain: blockChain.chain,
    length: blockChain.chain.length
  });
}

function getPendingTransactions (req, res, next) {
  return res.send({
    transactions: blockChain.currentTransactions,
    length: blockChain.currentTransactions.length
  });
}

function registerNewNode (req, res) {
  let body = req.body.nodes;
  if (!body.length) {
    res.status(400);
    return res.send({ message: 'please provide node addresses' });
  }
  body.forEach(node => {
    blockChain.registerNodes(node);
  });
  return res.send({
    message: 'nodes added',
    totalNodes: blockChain.nodes.join(',')
  });
}

async function resolveConflict (req, res) {
  let replaced = await blockChain.resolveConflict();
  if (replaced) {
    console.log('replaced chain in if: ', replaced);
    console.log('replaced chain in if: ', blockChain.chain);

    return res.send({
      message: 'our chain was replaced',
      newChain: blockChain.chain
    });
  } else {
    console.log('not replaced chain: ', replaced);
    console.log('not replaced chain: ', blockChain.chain);
    return res.send({
      message: 'our chain is valid',
      chain: blockChain.chain
    });
  }
}

function verifyTransaction(req, res, next) {
  const requiredFields = ['publicKey', 'encryptedData'];
  let throwError = false;
  requiredFields.forEach(field => {
    if (!req.body[field] && req.body[field] !== false) {
      throwError = true;
    }
  });
  if (throwError) {
    res.status(400);
    return res.send({ message: 'required fields missing' });
  }

  let transaction = blockChain.fetchTransactionFromChain(req.body.publicKey);
  if (transaction && transaction.encryptedData === req.body.encryptedData) {
    res.send({message: true});
  } else {
    res.send({message: false});
  }
}

module.exports = {
  mineBlock,
  addNewTransaction,
  getChain,
  registerNewNode,
  resolveConflict,
  getPendingTransactions,
  verifyTransaction
};
