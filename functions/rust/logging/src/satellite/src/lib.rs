//! Juno Logging Example — Serverless Functions
//!
//! Demonstrates how to use Juno's built-in logging functions
//! (`junobuild_satellite::{info, debug, warn, error}`) to emit structured log
//! entries that appear with proper levels in the Juno Console.
//!
//! ## Key Concepts
//!
//! 1. **Custom loggers vs `ic_cdk::print`**
//!    - `ic_cdk::print` writes to the canister's raw output and appears as
//!      "Unknown" level in the Juno Console — fine for quick debugging but
//!      lacks level metadata.
//!    - `junobuild_satellite::{info, debug, warn, error}` write structured log
//!      entries to the Juno Datastore with proper levels (Info, Debug, Warning,
//!      Error) visible in the Console UI.
//!
//! 2. **RNG dependency**
//!    - Custom loggers need a seeded RNG to generate unique document keys.
//!    - Enable the `on_init_random_seed` feature in Cargo.toml and implement
//!      `juno_on_init_random_seed()` so you know when loggers are ready.
//!    - Before the seed callback fires (e.g. during canister upgrade), custom
//!      loggers will return `Err`. The `logging` module in this example handles
//!      this gracefully by falling back to `ic_cdk::print`.
//!
//! 3. **Log levels**
//!    - `debug`:  Diagnostic messages for development (not shown by default).
//!    - `info`:   Successful operations, state changes.
//!    - `warn`:   Skipped operations, unusual but non-fatal conditions.
//!    - `error`:  Failed operations, unexpected errors.

mod logging;

use junobuild_macros::on_set_doc;
use junobuild_satellite::{include_satellite, OnSetDocContext};
use junobuild_utils::decode_doc_data;
use serde::{Deserialize, Serialize};

/// Example document data — a simple note with a title and body.
#[derive(Serialize, Deserialize)]
struct Note {
    title: String,
    body: String,
}

/// Hook: fires whenever a document is created or updated in the "notes" collection.
///
/// Demonstrates all four log levels in a realistic context.
#[on_set_doc(collections = ["notes"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // Debug: diagnostic trace for development
    logging::log_debug("Hooks", &format!(
        "on_set_doc fired for collection='{}' key='{}'",
        context.data.collection, context.data.key
    ));

    // Decode the saved document data
    let note: Note = match decode_doc_data(&context.data.data.after.data) {
        Ok(n) => n,
        Err(e) => {
            // Error: something went wrong
            logging::log_error("Hooks", &format!(
                "Failed to decode note data for key '{}': {}",
                context.data.key, e
            ));
            return Err(e);
        }
    };

    // Warn: flag empty notes (non-fatal but worth noting)
    if note.body.is_empty() {
        logging::log_warn("Hooks", &format!(
            "Note '{}' has an empty body — key='{}'",
            note.title, context.data.key
        ));
    }

    // Info: successful operation
    logging::log_info("Hooks", &format!(
        "Note saved: title='{}' by user {} (key='{}')",
        note.title,
        context.caller.to_text(),
        context.data.key
    ));

    Ok(())
}

/// Called by Juno after the RNG has been seeded on canister init/upgrade.
///
/// Custom loggers depend on the RNG for unique document keys, so they only
/// work reliably AFTER this callback fires. Before this point, the `logging`
/// module falls back to `ic_cdk::print`.
#[unsafe(no_mangle)]
fn juno_on_init_random_seed() {
    logging::log_info("Satellite", "RNG seeded — custom loggers ready");
}

include_satellite!();
