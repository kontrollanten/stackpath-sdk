# StackPath SDK

A simple SDK to talk to [StackPath API](https://stackpath.dev/).

# Getting started
`yarn add stackpath-sdk`

```
const Stackpath = require('stackpath-sdk');

async function init() {
  const sp = new Stackpath({
    clientId: '',
    clientSecret: '',
  });

  await sp.auth();

  const ipList = await sp.getIpList();
}
```

# API
Currently there's only support for authentication and getting the IP white list.

```
sp.auth();

sp.getIpList();
```
