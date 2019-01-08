const fetch = require('node-fetch');
const {isHash, isTrytes} = require('./util');

module.exports = function remoteATT(apiKey, timeoutMs, logger) {
  apiKey = apiKey || null;
  timeoutMs = timeoutMs || 5000;
  logger = logger || console;

  return async function attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, cb) {
    validate(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
  
    const resp = await powsrvATT(
      trunkTransaction,
      branchTransaction,
      minWeightMagnitude,
      trytes,
      apiKey,
      timeoutMs
    );
  
    if ((resp[0]) != null) {
      return resp[0];
    } else {
      return resp[1].trytes;
    }
  }
}

const powsrvATT = async (trunkTransaction, branchTransaction, minWeightMagnitude, trytes, apiKey, timeoutMs) => {
  var command = {
    'command'             : 'attachToTangle',
    'trunkTransaction'    : trunkTransaction,
    'branchTransaction'   : branchTransaction,
    'minWeightMagnitude'  : minWeightMagnitude,
    'trytes'              : trytes
  };

  let params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-IOTA-API-Version': '1'
    },
    body: JSON.stringify(command),
    timeout: timeoutMs
  };
  if (apiKey) params.headers['Authorization'] = 'powsrv-token ' + apiKey;

  try {
    const response = await fetch(`https://api.powsrv.io:443`, params);

    if (response.status != 200) {
      if ((response.status > 300) && (response.status < 600)) {
        // 3xx-5xx responses are NOT network errors
        const msg = await response.json();
        return [msg.message, null];
      }
      return [response.statusText, null];
    } 
    const data = await response.json();
    return [null, data];
  }
  catch(e) {
    return [e, null];
  }
}


function validate(trunkTransaction, branchTransaction, minWeightMagnitude, trytes) {
  if (!isHash(trunkTransaction)) {
    throw new Error("You have provided an invalid hash as a trunk/branch: " + trunkTransaction);
  }

  if (!isHash(branchTransaction)) {
    throw new Error("You have provided an invalid hash as a trunk/branch: " + branchTransaction);
  }

  if (!Number.isInteger(minWeightMagnitude) || minWeightMagnitude < 0) {
    throw new Error("One of your inputs is not an integer");
  }

  trytes.map(t => {
    if (!isTrytes(t)) {
      throw new Error("Invalid Trytes provided");
    }
  })
}
