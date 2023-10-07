# NodeJS - Admin Example - Read And Save Data

A sample admin NodeJS script that reads a JSON file and save its data to [Juno](https://juno.build).

## Getting started

Make sure you have [node.js](https://nodejs.org) LTS installed.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/admin/save
npm ci
```

## Local development

> Note: unless you modify the IDs in the `example.json` data or the configuration, running the script out-of-the-box is going to fail because it will try to overwrite data that your controller don't own

```bash
npm run start
```

## Configuration

If you wish to use this script to upload your own data, see [.env](.env) for configuration options.

Environment options are the following:

- `DATA_SRC`: a path to a JSON data. it should contain an array of object
- `DATA_KEY_FIELD`: the field within an object of the JSON data used as key - i.e. the unique keys that will be use to set the documents in teh datastore
- `JUNO_SATELLITE_ID`: the satellite ID to which you want to set the data
- `JUNO_DATASTORE_COLLECTION`: the datastore's collection in which the data should be persisted