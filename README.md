:no_entry: [DEPRECATED] This is no longer supported, please consider using [the example on the nextjs repo](https://github.com/zeit/next.js/tree/canary/examples/with-firebase-hosting-and-docker) instead. 

# NextJS with firebase cloud functions and Docker

[![Greenkeeper badge](https://badges.greenkeeper.io/Bolket/next-firebase-functions.svg)](https://greenkeeper.io/)

## How to use

- Clone the repo [or download](https://github.com/bolket/next-firebase-functions/archive/master.zip):

```bash
git clone git@github.com:bolket/next-firebase-functions.git
cd next-firebase-functions
```

- ADD serviceAccountKey.json to your project
- SET .env from .env.example

### Dev next

```bash
yarn docker:dev
open http://localhost:5000
```

### Firebase serve

```bash
yarn docker:serve
open http://localhost:3000
```

### Firebase deploy

```bash
yarn docker:deploy
```

## Donate

- Etherium (ETH): 0x57b5ab33a339fc7fab86127981e4095b84d5ddfa
