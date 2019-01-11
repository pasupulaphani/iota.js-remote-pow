const fetch = require('node-fetch');

module.exports = async function theTangleOrgATT (trunkTransaction, branchTransaction, minWeightMagnitude, trytes, timeoutMs) {
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

  try {
    const response = await fetch('https://nodes.thetangle.org:443', params);

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
  catch (e) {
    return [e, null];
  }
};
