# NodeJS - Admin Example - Read And Save Data

A sample admin NodeJS script to manually set a controller to a [Juno](https://juno.build) satellite.

## Getting started

> [!NOTE]
> Make sure you have Juno's CLI (`npm i -g @junobuild/cli`) installed on your machine.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/admin/controller
npm ci
```

## Execution and development

Run following command in your terminal to execute the script.

```bash
juno run --src index.mjs --controllerId=<the-principal-id>
```

Replace `<the-principal-id>` with the ID of the principal you are looking to set as a controller.

You can also provide a hint - like a name - for the particular profile.

```bash
juno run --src index.mjs --controllerId=<the-principal-id> --profile=my_controller_name
```

## Configuration

If you wish to use this script to configure your satellite, following environment options have to be set in [.env](.env).

- `JUNO_MISSION_CONTROL_ID`: your mission control ID

Adapt your Satellite IDs in the [juno.config.mjs](./juno.config.mjs).
