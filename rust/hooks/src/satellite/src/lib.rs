use ic_cdk::print;
use junobuild_macros::{on_delete_doc, on_set_doc, on_set_many_docs, on_upload_asset};
use junobuild_satellite::{
    include_satellite, set_doc_store, OnDeleteDocContext, OnSetDocContext, OnSetManyDocsContext,
    OnUploadAssetContext, SetDoc,
};
use junobuild_utils::{decode_doc_data, encode_doc_data};
use junobuild_utils::{DocDataBigInt, DocDataPrincipal};
use serde::{Deserialize, Serialize};

// The data of the document we are looking to update in the Satellite's Datastore.
#[derive(Serialize, Deserialize)]
struct Person {
    yolo: bool,
    hello: String,
    principal: DocDataPrincipal,
    value: DocDataBigInt,
}

#[on_set_doc(collections = ["demo"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // We decode the new data saved in the Datastore because it holds those as blob.
    let mut data: Person = decode_doc_data(&context.data.data.after.data)?;

    // Some printout for demo purpose
    print(format!("[on_set_doc] Caller: {}", context.caller.to_text()));

    print(format!(
        "[on_set_doc] Collection: {}",
        context.data.collection
    ));

    print(format!(
        "[on_set_doc] Data: {} {}",
        data.principal.value, data.value.value
    ));

    // We update the document's data that was saved in the Datastore with the call from the frontend dapp.
    data.hello = format!("{} checked", data.hello);
    data.yolo = false;

    // We encode the data back to blob.
    let encode_data = encode_doc_data(&data)?;

    // We construct the parameters required to call the function that save the data in the Datastore.
    let doc: SetDoc = SetDoc {
        data: encode_data,
        description: context.data.data.after.description,
        version: context.data.data.after.version,
    };

    // We save the document for the same caller as the one who triggered the original on_set_doc, in the same collection with the same key as well.
    set_doc_store(
        context.caller,
        context.data.collection,
        context.data.key,
        doc,
    )?;

    Ok(())
}

#[on_set_many_docs(collections = ["demo"])]
async fn on_set_many_docs(context: OnSetManyDocsContext) -> Result<(), String> {
    print(format!("Many docs called {}", context.data.len()));

    Ok(())
}

#[on_delete_doc]
async fn on_delete_doc(_context: OnDeleteDocContext) -> Result<(), String> {
    print("Bye bye");

    Ok(())
}

#[on_upload_asset]
async fn on_upload_asset(context: OnUploadAssetContext) -> Result<(), String> {
    print(format!("Asset uploaded {}", context.data.key.full_path));

    Ok(())
}

#[ic_cdk::query]
fn say() {
    print("Hello");
}

include_satellite!();
