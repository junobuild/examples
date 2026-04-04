# HTTPS Outcalls

A sample app that showcases how to implement [HTTPS outcalls](https://juno.build/docs/guides/rust#https-outcalls) on Juno with serverless functions written in TypeScript.

## Getting started

```bash
git clone https://github.com/junobuild/examples
cd typescript/https-outcalls
npm ci
```

## How to Run

1. **Install dependencies**:

```bash
npm ci
```

2. **Start Juno local emulator**:

> [!IMPORTANT]
> Requires the Juno CLI to be available `npm i -g @junobuild/cli`

```bash
juno emulator start
```

3. **Create a Satellite** for local dev:

- Visit [http://localhost:5866](http://localhost:5866) and follow the instructions.
- Update `juno.config.ts` with your Satellite ID.

4. **Create required collections**:

- `dogs` in Datastore: [http://localhost:5866/datastore](http://localhost:5866/datastore)

5. **Start the frontend dev server** (in a separate terminal):

```bash
npm run dev
```

6. **Build the serverless functions** (in a separate terminal):

```bash
juno functions build
```

The emulator will automatically upgrade your Satellite and live reload the changes.
