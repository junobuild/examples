# NodeJS - Admin - Migrate user data

Satellite v0.0.22 introduces a few enforcements, including validation of the strict format for user data fields, which were previously unused.

This will work for all applications unless you participated in the beta and are still using a Satellite created during that time, as users created during this period have a different payload.

This script provides a way for admin controllers to migrate the old data to the newer format.

> [!NOTE]
> The script does not paginate data and assume you have less than 100 users registered. It also uses setManyDocs and therefore also assumes only few users should be migrated.

## Getting started

> ![NOTE]
> Make sure you have Juno's CLI (`npm i -g @junobuild/cli`) installed on your machine.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/admin/migrate-old-user-data
npm ci
```

## Configuration

Configure your satellite ID in [juno.config.mjs](./juno.config.mjs).

## List users to migrate

List users whose payload is not compatible with the current structure.

```
juno run --src migrate.mjs --list
```

## Migrate

Effectively migrate the old beta users.

```
juno run --src migrate.mjs
```
