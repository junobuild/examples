# Logging

A sample app that demonstrates how to use Juno's built-in logging functions in Rust serverless functions.

Instead of `ic_cdk::print` (which shows as "Unknown" level in the Juno Console), this example uses `junobuild_satellite::{info, debug, warn, error}` to emit structured log entries with proper levels.

## Key Files

- [`src/satellite/src/lib.rs`](./src/satellite/src/lib.rs) — Hook that demonstrates all four log levels
- [`src/satellite/src/logging.rs`](./src/satellite/src/logging.rs) — Reusable logging utility module

## Getting started

```bash
git clone https://github.com/junobuild/examples
cd functions/rust/logging
```

## How to Run

1. **Install dependencies**:

```bash
npm ci
```

2. **Start Juno local emulator**:

> Requires the Juno CLI: `npm i -g @junobuild/cli`

```bash
juno emulator start
```

3. **Create a Satellite** for local dev:

- Visit [http://localhost:5866](http://localhost:5866) and follow the instructions.
- Update `juno.config.ts` with your Satellite ID.

4. **Create required collection**:

- `notes` in Datastore: [http://localhost:5866/datastore](http://localhost:5866/datastore)

5. **Start the frontend dev server** (in a separate terminal):

```bash
npm run dev
```

6. **Build the serverless functions** (in a separate terminal):

```bash
juno functions build
```

The emulator will automatically upgrade your Satellite and live reload the changes.

7. **Test logging**:

- Sign in and save a note using the frontend.
- Check the **Juno Console → Functions → Logs** tab to see log entries with proper levels.
- Save a note with an empty body to trigger a warning-level log.

## How It Works

### Log Levels

| Function                       | Level   | Use Case                               |
| ------------------------------ | ------- | -------------------------------------- |
| `junobuild_satellite::debug()` | Debug   | Diagnostic messages for development    |
| `junobuild_satellite::info()`  | Info    | Successful operations, state changes   |
| `junobuild_satellite::warn()`  | Warning | Skipped operations, unusual conditions |
| `junobuild_satellite::error()` | Error   | Failed operations, unexpected errors   |

### RNG Dependency

Custom loggers require a seeded RNG to generate unique document keys. Enable the `on_init_random_seed` feature in your `Cargo.toml`:

```toml
junobuild-satellite = { version = "0.2.0", features = ["on_set_doc", "on_init_random_seed"] }
```

Then implement the callback to know when loggers are ready:

```rust
#[unsafe(no_mangle)]
fn juno_on_init_random_seed() {
    // Custom loggers are now available
    logging::log_info("Satellite", "RNG seeded — loggers ready");
}
```

### Why Not `ic_cdk::print`?

|                        | `ic_cdk::print`                | `junobuild_satellite::info()` etc. |
| ---------------------- | ------------------------------ | ---------------------------------- |
| **Juno Console Level** | "Unknown"                      | Info / Debug / Warning / Error     |
| **Availability**       | Always                         | After RNG seed                     |
| **Best for**           | Quick debug, pre-seed fallback | Production logging                 |

The `logging.rs` module in this example wraps both: it tries the Juno logger first and falls back to `ic_cdk::print` if it fails (e.g. before the RNG is seeded).
