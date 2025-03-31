use junobuild_macros::assert_set_doc;
use junobuild_satellite::{include_satellite, AssertSetDocContext};
use junobuild_utils::decode_doc_data;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Note {
    text: String,
    url: Option<String>,
}

#[assert_set_doc(collections = ["notes"])]
fn assert_set_doc(context: AssertSetDocContext) -> Result<(), String> {
    let note = decode_doc_data::<Note>(&context.data.data.proposed.data)?;

    if note.text.to_lowercase().contains("hello") {
        return Err("The note should not contain the keyword 'hello'.".to_string());
    }

    Ok(())
}

include_satellite!();
