# Node.js — Canister

A sample Node.js script to install a third-party canister on the [Juno](https://juno.build) emulator.

> [!IMPORTANT]
> Aside from script support for handling external canisters in the emulator, Juno's tooling does not provide
> any additional features. For example, installing a canister does not generate bindings to interact with it,
> neither through scripts nor in your frontend.

## Getting started

> [!NOTE]
> Make sure Juno's CLI is installed on your machine: `npm i -g @junobuild/cli`

```bash
git clone https://github.com/junobuild/examples
cd examples/node/canister
npm ci
```

## Trying it out

For demo purposes, this script installs or upgrades the ICP canister on the emulator.

```bash
juno run --src install.ts --mode development
```

## Local development

To adapt the script for your own canister, follow these steps:

1. Copy [install.ts](install.ts) into your project.

2. Edit the script:

**a. Set a canister ID.**

Replace the canister ID with a valid ID. The canister doesn't need to exist yet, the script handles both install and upgrade, but an ID is required upfront.

> [!NOTE]
> The DX will be improved in the future.

**b. Update the WASM path.**

Point it to your compiled WASM file. Both `.wasm` and `.wasm.gz` are supported.

**c. Set the init arguments.**

Update the install parameters to match your canister requirements. If it takes no arguments, pass `IDL.encode([], [])`.

3. Run the script:

```bash
juno run --src /path/to/your/script.ts --mode development
```

The script will install or upgrade the canister on your locally running Juno emulator.
