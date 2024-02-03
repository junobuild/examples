use ic_cdk::print;
use junobuild_macros::{
    on_delete_asset, on_delete_doc, on_delete_many_assets, on_delete_many_docs, on_set_doc,
    on_set_many_docs, on_upload_asset,
};
use junobuild_satellite::{
    include_satellite, set_doc_store, OnDeleteAssetContext, OnDeleteDocContext,
    OnDeleteManyAssetsContext, OnDeleteManyDocsContext, OnSetDocContext, OnSetManyDocsContext,
    OnUploadAssetContext, SetDoc,
};
use junobuild_utils::{decode_doc_data, encode_doc_data};
use junobuild_utils::{DocDataBigInt, DocDataPrincipal};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Person {
    yolo: bool,
    hello: String,
    principal: DocDataPrincipal,
    value: DocDataBigInt,
}

#[on_set_doc(collections = ["demo"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    let mut data: Person = decode_doc_data(&context.data.data.after.data)?;

    print(format!("[on_set_doc] Caller: {}", context.caller.to_text()));

    print(format!(
        "[on_set_doc] Collection: {}",
        context.data.collection
    ));

    print(format!(
        "[on_set_doc] Data: {} {}",
        data.principal.value, data.value.value
    ));

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

#[on_upload_asset]
async fn on_upload_asset(context: OnUploadAssetContext) -> Result<(), String> {
    print(format!("Asset uploaded {}", context.data.key.full_path));

    Ok(())
}

#[on_delete_asset]
async fn on_delete_asset(_context: OnDeleteAssetContext) -> Result<(), String> {
    Ok(())
}

#[on_delete_many_assets]
async fn on_delete_many_assets(_context: OnDeleteManyAssetsContext) -> Result<(), String> {
    Ok(())
}

#[ic_cdk::query]
fn say() {
    print("Hello".to_string());
}

include_satellite!();
