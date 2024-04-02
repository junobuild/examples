# Hooks

A sample app that showcases how to derive an Ethereum address for an authenticated user of Juno on the Internet Computer.

## Concept Overview

- **User Authentication:** Upon sign-in, Juno's authentication registers a user in the Satellite smart contract, specifically within a non-public collection named `#user`.
- **Triggering Serverless Hooks:** The creation of a user entry automatically triggers the serverless function hook `on_set_doc`.
- **Ethereum Address Derivation:** Within this hook, an Ethereum address is derived using [threshold ECDSA](https://internetcomputer.org/docs/current/references/t-ecdsa-how-it-works).
- **Profile Saving:** The derived Ethereum address is then stored in another collection called `profiles`. This collection is initially created by the developer of the Satellite project and is configured in `juno.dev.config.ts` for local development purposes.
- **Frontend Integration:** Users can utilize the `get` function on the frontend to retrieve their Ethereum address seamlessly.

Additionally, the frontend features an action named `balance` that queries the balance of the loaded Ethereum address on the Sepolia network via Etherscan. This is achieved without requiring an API key, utilizing public queries.

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
