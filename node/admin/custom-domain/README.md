# NodeJS - Admin script to set a BN id

Admin scripts to manually set or update a custom domain to a [Juno](https://juno.build) Satellite's configuration.

## Getting started

> [!NOTE]
> Make sure you have Juno's CLI (`npm i -g @junobuild/cli`) installed on your machine.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/admin/custom-domain
npm ci
```

## Configuration

Configure your satellite ID in [juno.config.mjs](./juno.config.mjs).

## Set BN ID in an existing Custom Domain

To associate a BN ID with an already configured custom domain, run the following command in your terminal to execute the script.

> Replace `<your-domain-name>` and `<BN-id-to-set>` with your values.

```bash
juno run --src update.mjs --domain=<your-domain-name> --bnid=<BN-id-to-set>
```

## Add a Custom Domain

If you want to add a new custom domain without setting a BN ID, use the following command.

> This will only add the domain, without assigning a BN ID.
> This is more of a workaround than a standard behavior.

```bash
juno run --src add.mjs --domain=<your-domain-name>
```
