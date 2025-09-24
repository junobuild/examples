# NodeJS - Admin Example - Import Export Documents

A sample admin NodeJS script that import and export documents with [Juno](https://juno.build).

## Getting started

> ![NOTE]
> Make sure you have Juno's CLI (`npm i -g @junobuild/cli`) installed on your machine.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/admin/import-export-docs
npm ci
```

## Configuration

Configure the required variables in [.env](.env) file.

- `DATA_SRC`: the path to the JSON data that will be read or written
- `JUNO_DATASTORE_COLLECTION`: the datastore's collection in which the data should be read and write

Adapt your Satellite IDs in the [juno.config.mjs](./juno.config.mjs).

## Execution

```bash
juno run --src export.mjs
juno run --src import.mjs
```
