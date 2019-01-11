const Joi = require('joi');

const {isHash, isTrytes} = require('./util');
const theTangleATT = require('./providers/thetangle');
const powsrvATT = require('./providers/powsrv');

/**
 * Returns 'trytes' if successful
 * 
 * @param    {object}   options - Accepts properties ["name", "redisOptions", "poolOptions", "logger"]
 * @param    {string}   options.provider - Provider name
 * @param    {object}   options.timeoutMs - attachToTangle timeout in milliseconds
 * @param    {object}   options.apiKey - Provider API key if any
 * @param    {object}   options.logger - Inject your custom logger
 * @returns  {string}   'trytes' if successful
 */
module.exports = function remoteATT (options) {
  const result = validateOptions(options);
  if (result.error) {
    throw new Error('INVALID_OPTIONS');
  }
  const value = result.value;
  const logger = require('./logger')(options.logger);

  return async function attachToTangle (trunkTransaction, branchTransaction, minWeightMagnitude, trytes, cb) { // eslint-disable-line 
    validateATTParams(trunkTransaction, branchTransaction, minWeightMagnitude, trytes);
  
    let resp;
    
    if (value.provider === 'powsrv') {
      resp = await powsrvATT(
        trunkTransaction,
        branchTransaction,
        minWeightMagnitude,
        trytes,
        value.timeoutMs,
        value.apiKey
      );
    } else if (value.provider === 'thetangle') {
      resp = await theTangleATT(
        trunkTransaction,
        branchTransaction,
        minWeightMagnitude,
        trytes,
        value.timeoutMs
      );
    } else {
      logger.error('Given provider unknown: ' + value.provider);
      throw new Error('UNKNOWN_PROVIDER');
    }
  
    if ((resp[0]) != null) {
      return resp[0];
    } else {
      return resp[1].trytes;
    }
  };
};

function validateOptions (options) {
  const schema = Joi.object().keys({
    provider: Joi.string().optional().valid('thetangle', 'powsrv').default('thetangle'),
    timeoutMs: Joi.number().integer().optional().default(5000),
    apiKey: Joi.string().optional().default(null),
    logger: Joi.object().optional().default(null)
  });

  return Joi.validate(options, schema, {stripUnknown: true});
}

function validateATTParams (trunkTransaction, branchTransaction, minWeightMagnitude, trytes) {
  if (!isHash(trunkTransaction)) {
    throw new Error('You have provided an invalid hash as a trunk/branch: ' + trunkTransaction);
  }

  if (!isHash(branchTransaction)) {
    throw new Error('You have provided an invalid hash as a trunk/branch: ' + branchTransaction);
  }

  if (!Number.isInteger(minWeightMagnitude) || minWeightMagnitude < 0) {
    throw new Error('MinWeightMagnitude is invalid: ' + minWeightMagnitude);
  }

  trytes.map(t => {
    if (!isTrytes(t)) {
      throw new Error('Invalid Trytes provided');
    }
  });
}
