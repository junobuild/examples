# NodeJS - Admin Example - Export

A sample admin NodeJS script that export documents with [Juno](https://juno.build).

## Getting started

Make sure you have [node.js](https://nodejs.org) LTS installed.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/admin/export-docs
npm ci
```

## Configuration

Configure the required variables in [.env](.env) file.

- `DATA_SRC`: the path to the JSON data that will be exported
- `JUNO_SATELLITE_ID`: the satellite ID
- `JUNO_DATASTORE_COLLECTION`: the datastore's collection in which the data should be read

## Execution

```bash
npm run export
```
