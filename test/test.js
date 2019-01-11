require('should');

const remoteATT = require('../lib/remote-attach-to-tangle');

describe('remoteATT', () => {
  describe('API', () => {
    it('throw error on invalid provider', () => {
      const options = {
        provider: 'INVALID'
      };
  
      (() => remoteATT(options)).should.throw(/"provider" must/);
    });

    it('throw error on invalid timeoutMs', () => {
      const options = {
        timeoutMs: 'INVALID'
      };
  
      (() => remoteATT(options)).should.throw(/"timeoutMs" must/);
    });

    it('allow empty options', () => {
      const options = {};
  
      (() => remoteATT(options)).should.not.throw();
    });

  });
});
