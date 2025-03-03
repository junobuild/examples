# NodeJS - Admin - Migrate user data
Satellite v0.0.22 introduces a few enforcements, including validation of the strict format for user data fields, which were previously unused.

This will work for all applications unless you participated in the beta and are still using a Satellite created during that time, as users created during this period have a different payload.

This script provides a way for admin controllers to migrate the old data to the newer format.

## Getting started

Make sure you have [node.js](https://nodejs.org) LTS installed.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/admin/migrate-old-user-data
npm ci
```

## Configuration

Configure your satellite ID in [.env](.env).

- `JUNO_SATELLITE_ID`: the satellite ID to which you want to set the BN id

## List users to migrate

List users whose payload is not compatible with the current structure.

```
npm run list
```