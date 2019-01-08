# iota.js-remote-pow
For latest iota.js (version >= 1.x.x) attachToTangle remote PoW. Library to delegate Proof-of-work 

### How to Use

```
const apiKey = null // Your powsrvio API 
const timeoutMs = 5000
const attachToTangle = require('iota.js-remote-pow')(apiKey, timeoutMs)

// Set attachToTangle to your IOTA client
const { composeAPI } = require('@iota/core')
const iota = composeAPI({
  attachToTangle
})
```

##### Improvements coming soon
- Add more providers (ATM uses powsrvio by default)

##### Copy
This repo is a modified version of the "iota.lib.js.powsrvio"(https://gitlab.com/powsrv.io/js/iota.lib.js.powsrvio) to work with latest IOTA.js (version >= 1.x.x). We thank the developers for the preliminary work
