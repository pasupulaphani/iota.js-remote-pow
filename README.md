# iota.js-remote-pow
For latest iota.js (version >= 1.x.x) attachToTangle remote PoW. Library to delegate Proof-of-work 


### Getting started
```
    npm install iota.js-remote-pow
```

### How to Use

```
const remoteATT = require('iota.js-remote-pow')
const attachToTangle = remoteATT()

// Set attachToTangle to your IOTA client
const { composeAPI } = require('@iota/core')
const iota = composeAPI({
  attachToTangle
})
```

#### Remote PoW providers
- thetangle(https://nodes.thetangle.org:443) - Default
- powsrv(https://api.powsrv.io:443)

#### API

- remoteATT([options])

#### `options` object properties

`options` is optional

<table class="params">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th class="last">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="name"><code>provider</code></td>
      <td class="type">
        <span class="param-type">string</span>
      </td>
      <td>
        <p>thetangle</p>
      </td>
      <td class="description last">
        <p>Provider name. thetangle/powsrv</p>
      </td>
    </tr>
    <tr>
      <td class="name"><code>timeoutMs</code></td>
      <td class="type">
        <span class="param-type">integer</span>
      </td>
      <td>
        <p>5000</p>
      </td>
      <td class="description last">
        <p>attachToTangle timeout in milliseconds</p>
      </td>
    </tr>
    <tr>
      <td class="name"><code>apiKey</code></td>
      <td class="type">
        <span class="param-type">string</span>
      </td>
      <td>
        <p>null</p>
      </td>
      <td class="description last">
        <p>Provider API key if any</p>
      </td>
    </tr>
    <tr>
      <td class="name"><code>logger</code></td>
      <td class="type">
        <span class="param-type">object</span>
      </td>
      <td>
        <p>null</p>
      </td>
      <td class="description last">
        <p>Inject your custom logger</p>
      </td>
    </tr>
  </tbody>
</table>

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/pasupulaphani/iota.js-remote-pow/blob/master/CONTRIBUTING.md)
