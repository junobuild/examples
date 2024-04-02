# Hooks

A sample app that showcases how to derive an Ethereum address for an authenticated user of Juno on the Internet Computer.

## Concept

- When user sign-in, Juno's authentication register a user in the Satellite smart contract (within a non public collection called `#user`).
- Once the entry is created, the serverless function hook `on_set_doc` is triggered.
- Within this hook, an Ethereum address is derived using [threshold ECDSA](https://internetcomputer.org/docs/current/references/t-ecdsa-how-it-works).
- The result is saved in another collection called `profiles`. A collection created by the developer of the Satellite and defined in `juno.dev.config.ts` for local development purpose.
- On the frontend side, user can execute the `get` function to retrieve the address.

The frontend also exposes an action `balance` which fetch the balance of the loaded address on Sepolia through Etherscan (no API key here, just public query for demo purpose).

## Getting started

```bash
git clone https://github.com/junobuild/examples
cd rust/ethereum-address
npm ci
```

## Local development

Running the frontend app:

```
npm run dev
```

Starting the local development (using Docker):

```
juno dev start
```

Building and deploying the extended [Satellite](src/satellite/src/lib.rs):

```
juno dev build
```
