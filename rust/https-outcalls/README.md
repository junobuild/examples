# Hooks

A sample app that showcases how to implement [HTTPS outcalls](https://internetcomputer.org/https-outcalls) on Juno.

## Getting started

```bash
git clone https://github.com/junobuild/examples
cd rust/https-outcalls
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
