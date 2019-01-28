const { remoteATT } = require('../src/remote-attach-to-tangle');

describe('remoteATT', () => {
  describe('API', () => {
    it('throw error on invalid provider', () => {
      const options = {
        provider: 'INVALID'
      };
  
      expect(() => {
        remoteATT(options);
      }).toThrow(/"provider" must/);
    });

    it('throw error on invalid timeoutMs', () => {
      const options = {
        timeoutMs: 'INVALID'
      };
  
      expect(() => {
        remoteATT(options);
      }).toThrow(/"timeoutMs" must/);
    });

    it('allow empty options', () => {
      const options = {};
  
      expect(() => {
        remoteATT(options);
      }).not.toThrow();
    });

  });
});
