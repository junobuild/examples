# NodeJS - Analytics - Collect

A NodeJS to download page views from [Juno](https://juno.build) analytics.

## Getting started

> [!NOTE]
> Make sure you have Juno's CLI (`npm i -g @junobuild/cli`) installed on your machine.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/analytics/collect
npm ci
```

## Configuration

Configure your Orbiter ID in the [juno.config.mjs](juno.config.mjs).

## Get Page Views

Use the following command to gather page views.

Both arguments — `from` and `to` — are required. Each must be a valid string representation of a date (without time information).

Data is collected hour by hour, meaning 24 queries will be performed for a single day.

```bash
juno run --src index.mjs --from 2025-04-02 --to 2025-04-03
```

## Get Track Events

To collect tracked events, run the same command as above but provide the arguments `--track-events`.

```bash
juno run --src index.mjs --from 2025-04-02 --to 2025-04-03 --track-events
```

## Get Performance Metrics

To collect performance metrics, run the same command as above but provide the arguments `--performance-metrics`.

```bash
juno run --src index.mjs --from 2025-04-02 --to 2025-04-03 --performance-metrics
```
