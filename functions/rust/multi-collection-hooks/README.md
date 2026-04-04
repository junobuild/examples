# Multi-Collection Hooks

A sample app that showcases serverless function hooks developed in Rust that listen to **multiple collections** in a single hook declaration.

This example demonstrates the dispatch pattern: a single `#[on_set_doc]`, `#[assert_set_doc]`, or `#[on_delete_doc]` macro listening to multiple collections and routing to per-collection handler functions with a `match`.

Resolves [#14](https://github.com/junobuild/examples/issues/14).

## Key Pattern

```rust
#[on_set_doc(collections = ["notes", "tasks"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    match context.data.collection.as_str() {
        "notes" => on_note_set(context),
        "tasks" => on_task_set(context),
        _ => Ok(()),
    }
}
```

## Getting started

```bash
git clone https://github.com/junobuild/examples
cd functions/rust/multi-collection-hooks
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

4. **Create required collections**:

- `notes` in Datastore: [http://localhost:5866/datastore](http://localhost:5866/datastore)
- `tasks` in Datastore: [http://localhost:5866/datastore](http://localhost:5866/datastore)

5. **Start the frontend dev server** (in a separate terminal):

```bash
npm run dev
```

6. **Build the serverless functions** (in a separate terminal):

```bash
juno functions build
```

The emulator will automatically upgrade your Satellite and live reload the changes.

## What it demonstrates

| Hook                | Collections      | Behaviour                                                      |
| ------------------- | ---------------- | -------------------------------------------------------------- |
| `#[assert_set_doc]` | `notes`, `tasks` | Validates data before save — rejects empty titles/descriptions |
| `#[on_set_doc]`     | `notes`, `tasks` | Modifies notes (appends " ✓") and logs task status after save  |
| `#[on_delete_doc]`  | `notes`, `tasks` | Logs deletions across both collections                         |
