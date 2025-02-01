# NodeJS - Admin script to set a BN id

Admin scripts to manually set or update a custom domain to a [Juno](https://juno.build) Satellite's configuration.

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

## Set BN ID in an existing Custom Domain

To associate a BN ID with an already configured custom domain, run the following command in your terminal to execute the script.

> Replace `<your-domain-name>` and `<BN-id-to-set>` with your values.

```bash
npm run update -- --domain=<your-domain-name> --bnid=<BN-id-to-set>
```

## Add a Custom Domain

If you want to add a new custom domain without setting a BN ID, use the following command.

> This will only add the domain, without assigning a BN ID.
> This is more of a workaround than a standard behavior.

```bash
npm run add -- --domain=<your-domain-name>
```
