# NodeJS - Analytics

A NodeJS to download page views from [Juno](https://juno.build) analytics.

## Getting started

Make sure you have [node.js](https://nodejs.org) LTS installed.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/analytics
npm ci
```

## Configuration

Configure your Orbiter ID in [.env](.env).

- `JUNO_ORBITER_ID`: the Orbiter ID from which you want to gather data

## Get Page Views

Use the following command to gather page views.

Both arguments — `from` and `to` — are required. Each must be a valid string representation of a date (without time information).

Data is collected hour by hour, meaning 24 queries will be performed for a single day.

```bash
npm run analytics -- --from 2025-04-02 --to 2025-04-03
```
