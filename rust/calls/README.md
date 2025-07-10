# Juno: React Example

```sh
npm create juno@latest -- --template react-ts-example
```

> 🧑‍🚀 **Seasoned dev?** Delete this file. Have fun!

![A screenshot of the example](https://raw.githubusercontent.com/junobuild/create-juno/main/screenshots/screenshot-example.png)

An example developed for [Juno](https://juno.build) using [React](https://react.dev).

## 🧭 Getting Started

To start experimenting with Juno locally, follow these steps:

### 1. Start the local development emulator

This will spin up the Juno backend locally:

```bash
juno dev start
```

### 2. Create a Satellite

Your project needs a Satellite. Create one to connect your app for development.

👉 [Open the Juno Console](http://localhost:5866)

### 3. Configure your project

Set the Satellite ID in your `juno.config.ts` file:

```ts
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
    },
    source: "dist",
    predeploy: ["npm run build"],
  },
});
```

### 4. Start the frontend dev server

In another terminal, start your app's dev server:

```bash
npm run dev
```

### 5. Create a Datastore collection

This template is a note-taking app, so it needs a `notes` collection. Create it in the Datastore.

👉 [Go to Datastore](http://localhost:5866/datastore)

### 6. Create a Storage collection

Likewise, it needs a collection named `images` to save assets. Create it in the Storage.

👉 [Go to Storage](http://localhost:5866/storage)

You only need to do this once. After that, you're ready to build 🚀

## 🛰️ Production

Ready to go live?

Just like for local development, you'll need to create a Satellite — but this time on the mainnet [Console](https://console.juno.build). Then, update your `juno.config.ts` with the new Satellite ID:

```ts
import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
      production: "<PROD_SATELLITE_ID>",
    },
    source: "dist",
    predeploy: ["npm run build"],
  },
});
```

Check out the full guides in the [docs](https://juno.build/docs/category/deployment).

## ✨ Links & Resources

- Looking to get started with Juno? Check out the [documentation](https://juno.build).
- Have a look at [React](https://react.dev) for question regarding the templates.
- Got questions, comments or feedback? [Join our discord](https://discord.gg/wHZ57Z2RAG) or [OpenChat](https://oc.app/community/vxgpi-nqaaa-aaaar-ar4lq-cai/?ref=xanzv-uaaaa-aaaaf-aneba-cai).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command          | Action                                                      |
| :--------------- | :---------------------------------------------------------- |
| `npm install`    | Installs dependencies                                       |
| `npm run dev`    | Starts frontend dev server at `localhost:5173`              |
| `juno dev start` | Quickstart the local development emulator |
| `npm run build`  | Build your production site to `./dist/`                     |
| `juno deploy`    | Deploy your project to a Satellite                          |

## 🚀 Launch

Explore this [guide](https://juno.build/docs/add-juno-to-an-app/create-a-satellite) to launch your Satellite into orbit via Juno's [administration console](https://console.juno.build).
