# Serverless Canister Call Demo (Rust + Juno)

A sample app showcasing how to perform canister calls (e.g., `transfer_from`) inside a Rust-based serverless function using [Juno](https://juno.build).

This example listens for documents added to the `request` collection and:

- Checks if the user has enough ICP.
- Calls the `transfer_from` method to move 1 ICP from the user's wallet to the Satellite.
- Marks the request as `processed` if the transfer succeeds.

The included UI is minimal and meant for testing.  
You can use it to request ICP and trigger the function. If successful, your ICP balance decreases by 1 and the request appears as `processed`.

## Getting started

```bash
git clone https://github.com/junobuild/examples
cd rust/calls
```

## How to Run

1. **Install dependencies**:

```bash
npm ci
```

2. **Start Juno local emulator**:

:::important

Requires the Juno CLI to be available `npm i -g @junobuild/cli`

:::

```bash
juno dev start
```

3. **Create a Satellite** for local dev:

- Visit [http://localhost:5866](http://localhost:5866) and follow the instructions.
- Update `juno.config.ts` with your Satellite ID.

4. **Create required collections**:

- `request` in Datastore: [http://localhost:5866/datastore](http://localhost:5866/datastore)

5. **Start the frontend dev server** (in a separate terminal):

```bash
npm run dev
```

6. **Build the serverless functions** (in a separate terminal):

```bash
juno functions build
```

The emulator will automatically upgrade your Satellite and live reload the changes.
