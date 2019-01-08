const { composeAPI } = require('@iota/core');

const remotePoW = require('./index');

const attachToTangle = remotePoW();

const iota = composeAPI({
  provider: 'https://nodes.thetangle.org:443',
  attachToTangle
});

const minWeightMagnitude = 14;
const depth = 3;

async function start(seed) {
  const toAddress = await iota.getNewAddress(seed);
  const amountInI = 0;

  const transfers = [{
    address: toAddress,
    value: amountInI
  }];

  // bundle prep for all transfers
  const trytes = await iota.prepareTransfers(seed, transfers);
  const bundle = await iota.sendTrytes(trytes, depth, minWeightMagnitude);
  console.log(`Published transaction with tail hash: ${bundle[0].hash}`);
  // console.log('Bundle:', bundle)
  console.log(`Explorer link https://thetangle.org/transaction/${bundle[0].hash}`, '\n');

}

const seed = '<seed>';
start(seed);
