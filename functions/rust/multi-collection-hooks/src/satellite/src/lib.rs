use ic_cdk::print;
use junobuild_macros::{assert_set_doc, on_delete_doc, on_set_doc};
use junobuild_satellite::{
    include_satellite, set_doc_store, AssertSetDocContext, OnDeleteDocContext, OnSetDocContext,
    SetDoc,
};
use junobuild_utils::{decode_doc_data, encode_doc_data};
use serde::{Deserialize, Serialize};

// ---------------------------------------------------------------------------
// Data structures — one per collection
// ---------------------------------------------------------------------------

#[derive(Serialize, Deserialize)]
struct Note {
    title: String,
    body: String,
}

#[derive(Serialize, Deserialize)]
struct Task {
    description: String,
    done: bool,
}

// ---------------------------------------------------------------------------
// Assertions — validate documents BEFORE they are persisted
// ---------------------------------------------------------------------------

/// A single `#[assert_set_doc]` hook listening to multiple collections.
///
/// Juno only allows one `#[assert_set_doc]` per crate, so we dispatch
/// to per-collection validation functions using a `match`.
#[assert_set_doc(collections = ["notes", "tasks"])]
fn assert_set_doc(context: AssertSetDocContext) -> Result<(), String> {
    match context.data.collection.as_str() {
        "notes" => assert_note(&context),
        "tasks" => assert_task(&context),
        _ => Ok(()),
    }
}

fn assert_note(context: &AssertSetDocContext) -> Result<(), String> {
    let note: Note = decode_doc_data(&context.data.data.proposed.data)?;

    if note.title.is_empty() {
        return Err("Note title must not be empty.".to_string());
    }

    print(format!("[assert] Note accepted: {}", note.title));
    Ok(())
}

fn assert_task(context: &AssertSetDocContext) -> Result<(), String> {
    let task: Task = decode_doc_data(&context.data.data.proposed.data)?;

    if task.description.is_empty() {
        return Err("Task description must not be empty.".to_string());
    }

    print(format!("[assert] Task accepted: {}", task.description));
    Ok(())
}

// ---------------------------------------------------------------------------
// Hooks — react AFTER the document is persisted
// ---------------------------------------------------------------------------

/// A single `#[on_set_doc]` hook listening to multiple collections.
///
/// The same dispatch pattern applies: match on the collection name
/// and call dedicated handler functions.
#[on_set_doc(collections = ["notes", "tasks"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    print(format!(
        "[on_set_doc] collection='{}' key='{}'",
        context.data.collection, context.data.key
    ));

    match context.data.collection.as_str() {
        "notes" => on_note_set(context),
        "tasks" => on_task_set(context),
        _ => Ok(()),
    }
}

/// When a note is saved, append " ✓" to its title to show it was processed.
fn on_note_set(context: OnSetDocContext) -> Result<(), String> {
    let mut note: Note = decode_doc_data(&context.data.data.after.data)?;

    // Guard: skip if already processed to avoid an infinite re-trigger loop.
    if note.title.ends_with(" ✓") {
        return Ok(());
    }

    note.title = format!("{} ✓", note.title);

    let doc = SetDoc {
        data: encode_doc_data(&note)?,
        description: context.data.data.after.description,
        version: context.data.data.after.version,
    };

    set_doc_store(
        context.caller,
        context.data.collection,
        context.data.key,
        doc,
    )?;

    print(format!("[on_set_doc] Note processed: {}", note.title));
    Ok(())
}

/// When a task is saved, log its completion status.
fn on_task_set(context: OnSetDocContext) -> Result<(), String> {
    let task: Task = decode_doc_data(&context.data.data.after.data)?;

    let status = if task.done { "completed" } else { "pending" };
    print(format!(
        "[on_set_doc] Task '{}' is {}",
        task.description, status
    ));

    Ok(())
}

// ---------------------------------------------------------------------------
// Delete hooks — also support multiple collections
// ---------------------------------------------------------------------------

#[on_delete_doc(collections = ["notes", "tasks"])]
async fn on_delete_doc(context: OnDeleteDocContext) -> Result<(), String> {
    print(format!(
        "[on_delete_doc] Deleted from '{}': key='{}'",
        context.data.collection, context.data.key
    ));

    Ok(())
}

include_satellite!();
