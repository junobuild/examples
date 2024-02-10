# NodeJS - Admin script to set a BN id

An admin NodeJS script to manually set a BN id to a [Juno](https://juno.build) satellite.

## Getting started

Make sure you have [node.js](https://nodejs.org) LTS installed.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/admin/custom-domain
npm ci
```

## Configuration

Configure your satellite ID in [.env](.env).

- `JUNO_SATELLITE_ID`: the satellite ID to which you want to set the BN id

## Execution and development

Run following command in your terminal to execute the script.

```bash
npm run start -- --domain=<your-domain-name> --bnid=<BN-id-to-set>
```
