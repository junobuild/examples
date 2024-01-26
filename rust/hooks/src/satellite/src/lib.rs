use ic_cdk::print;
use junobuild_macros::{on_delete_doc, on_delete_many_docs, on_set_doc, on_set_many_docs};
use junobuild_satellite::{
    include_satellite, set_doc_store, OnDeleteDocContext, OnDeleteManyDocsContext, OnSetDocContext,
    OnSetManyDocsContext, SetDoc,
};
use junobuild_utils::{decode_doc_data, encode_doc_data};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Person {
    yolo: bool,
    hello: String,
}

#[on_set_doc(collections = ["demo"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    let mut data: Person = decode_doc_data(&context.data.data.after.data)?;

    print(format!("[on_set_doc] Caller: {}", context.caller.to_text()));

    print(format!(
        "[on_set_doc] Collection: {}",
        context.data.collection
    ));

    print(format!("[on_set_doc] Data: {} {}", data.hello, data.yolo));

    data.hello = format!("{} checked", data.hello);
    data.yolo = false;

    let encode_data = encode_doc_data(&data)?;

    let doc: SetDoc = SetDoc {
        data: encode_data,
        description: context.data.data.after.description,
        updated_at: Some(context.data.data.after.updated_at),
    };

    set_doc_store(
        context.caller,
        context.data.collection,
        context.data.key,
        doc,
    )?;

    Ok(())
}

#[on_set_many_docs(collections = ["demo_2"])]
async fn on_set_many_docs(context: OnSetManyDocsContext) -> Result<(), String> {
    print(format!("Many docs called {}", context.data.len()));

    Ok(())
}

#[on_delete_doc]
async fn on_delete_doc(_context: OnDeleteDocContext) -> Result<(), String> {
    print("Bye bye");

    Ok(())
}

#[on_delete_many_docs]
async fn on_delete_many_docs(_context: OnDeleteManyDocsContext) -> Result<(), String> {
    Ok(())
}

include_satellite!();
