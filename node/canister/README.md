# NodeJS - Canister

A sample NodeJS script to install a third-party canister on the [Juno](https://juno.build).

## Getting started

> [!NOTE]
> Make sure you have Juno's CLI (`npm i -g @junobuild/cli`) installed on your machine.

```bash
git clone https://github.com/junobuild/examples
cd examples/node/canister
npm ci
```

## Local development

1. Edit the script with the target canister ID. It does not necessarely have to exists in advance but, the ID must be provided

> [!NOTE]
> The DX will be improved in the future.

```bash
juno run --src index.ts
```
