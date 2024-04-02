# Hooks

A sample app that showcases how to derive an Ethereum address for an authenticated user of Juno on the Internet Computer.

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
