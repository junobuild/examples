mod notes;

use crate::notes::{generate_list_of_notes, insert_asset};
use junobuild_macros::on_set_doc;
use junobuild_satellite::{include_satellite, set_doc_store, OnSetDocContext, SetDoc};
use junobuild_utils::{decode_doc_data, encode_doc_data, encode_doc_data_to_string};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Note {
    text: String,
    url: Option<String>,
}

#[on_set_doc]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    ic_cdk::print("Let's go!");

    let mut note: Note = decode_doc_data(&context.data.data.after.data)?;

    note.text = format!("{} checked.", note.text);

    let encode_data = encode_doc_data(&note)?;

    let doc: SetDoc = SetDoc {
        data: encode_data,
        description: context.data.data.after.description,
        version: context.data.data.after.version,
    };

    set_doc_store(
        context.caller,
        context.data.collection,
        context.data.key.clone(),
        doc,
    )?;

    let json = encode_doc_data_to_string(&note)?;

    let name = format!("{}.json", context.data.key).clone();

    insert_asset(&name, &json)?;

    generate_list_of_notes()?;

    Ok(())
}

include_satellite!();
