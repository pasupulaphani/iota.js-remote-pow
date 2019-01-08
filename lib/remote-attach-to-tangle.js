const {isHash, isTrytes} = require("./util");
const powsrvATT = require("./providers/powsrv");

module.exports = function remoteATT (apiKey, timeoutMs) {
  apiKey = apiKey || null;
  timeoutMs = timeoutMs || 5000;

  return async function attachToTangle (trunkTransaction, branchTransaction, minWeightMagnitude, trytes, cb) {
    validate(trunkTransaction, branchTransaction, minWeightMagnitude, trytes);
  
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
  };
};

function validate (trunkTransaction, branchTransaction, minWeightMagnitude, trytes) {
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
  });
}
