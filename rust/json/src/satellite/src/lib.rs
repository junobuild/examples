mod generators;

use crate::generators::{generate_list_of_notes, generate_note};
use junobuild_macros::on_set_doc;
use junobuild_satellite::{include_satellite, OnSetDocContext};

#[on_set_doc]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    ic_cdk::print("Let's go!");

    generate_note(&context.data.key, &context.data.data.after)?;

    generate_list_of_notes()?;

    Ok(())
}

include_satellite!();
