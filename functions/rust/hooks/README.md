# Hooks

A sample app that showcases a serverless function hooks developed in Rust.

## Getting started

```bash
git clone https://github.com/junobuild/examples
cd rust/hooks
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

- `demo` in Datastore: [http://localhost:5866/datastore](http://localhost:5866/datastore)
- `images` in Storage: [http://localhost:5866/storage](http://localhost:5866/storage)

5. **Start the frontend dev server** (in a separate terminal):

```bash
npm run dev
```

6. **Build the serverless functions** (in a separate terminal):

```bash
juno functions build
```

The emulator will automatically upgrade your Satellite and live reload the changes.
