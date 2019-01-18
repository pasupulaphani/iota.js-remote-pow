# iota.js-remote-pow
For latest iota.js (version >= 1.x.x) attachToTangle remote PoW. Library to delegate Proof-of-work. [More info](https://medium.com/@phaninder/iota-proof-of-work-remote-vs-local-explained-1cbd89392a79)


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
        <span>thetangle</span>
      </td>
      <td class="description last">
        <span>Provider name. Available: thetangle, powsrv</span>
      </td>
    </tr>
    <tr>
      <td class="name"><code>timeoutMs</code></td>
      <td class="type">
        <span class="param-type">integer</span>
      </td>
      <td>
        <span>5000</span>
      </td>
      <td class="description last">
        <span>attachToTangle timeout in milliseconds</span>
      </td>
    </tr>
    <tr>
      <td class="name"><code>apiKey</code></td>
      <td class="type">
        <span class="param-type">string</span>
      </td>
      <td>
        <span>null</span>
      </td>
      <td class="description last">
        <span>Provider API key if any</span>
      </td>
    </tr>
    <tr>
      <td class="name"><code>logger</code></td>
      <td class="type">
        <span class="param-type">object</span>
      </td>
      <td>
        <span>null</span>
      </td>
      <td class="description last">
        <span>Inject your custom logger</span>
      </td>
    </tr>
  </tbody>
</table>

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/pasupulaphani/iota.js-remote-pow/blob/master/CONTRIBUTING.md)
