use ic_cdk::id;
use junobuild_macros::{
    assert_delete_asset, assert_delete_doc, assert_set_doc, assert_upload_asset, on_delete_asset,
    on_delete_doc, on_delete_many_assets, on_delete_many_docs, on_set_doc, on_set_many_docs,
    on_upload_asset,
};
use junobuild_satellite::{
    include_satellite, set_asset_handler, set_doc_store, AssertDeleteAssetContext,
    AssertDeleteDocContext, AssertSetDocContext, AssertUploadAssetContext, OnDeleteAssetContext,
    OnDeleteDocContext, OnDeleteManyAssetsContext, OnDeleteManyDocsContext, OnSetDocContext,
    OnSetManyDocsContext, OnUploadAssetContext, SetDoc,
};
use junobuild_storage::http::types::HeaderField;
use junobuild_storage::types::store::AssetKey;
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

    ic_cdk::print(format!("Json: {} {}", name, json));

    let collection = "notes".to_string();

    let key: AssetKey = AssetKey {
        name: name.clone(),
        full_path: format!("/{}/{}", collection, name.clone()).to_string(),
        token: None,
        collection,
        owner: id(),
        description: None,
    };

    let headers = vec![HeaderField(
        "content-type".to_string(),
        "application/json".to_string(),
    )];

    set_asset_handler(&key, &json, &headers)?;

    Ok(())
}

#[on_set_many_docs]
async fn on_set_many_docs(_context: OnSetManyDocsContext) -> Result<(), String> {
    Ok(())
}

#[on_delete_doc]
async fn on_delete_doc(_context: OnDeleteDocContext) -> Result<(), String> {
    Ok(())
}

#[on_delete_many_docs]
async fn on_delete_many_docs(_context: OnDeleteManyDocsContext) -> Result<(), String> {
    Ok(())
}

#[on_upload_asset]
async fn on_upload_asset(_context: OnUploadAssetContext) -> Result<(), String> {
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

#[assert_set_doc]
fn assert_set_doc(_context: AssertSetDocContext) -> Result<(), String> {
    Ok(())
}

#[assert_delete_doc]
fn assert_delete_doc(_context: AssertDeleteDocContext) -> Result<(), String> {
    Ok(())
}

#[assert_upload_asset]
fn assert_upload_asset(_context: AssertUploadAssetContext) -> Result<(), String> {
    Ok(())
}

#[assert_delete_asset]
fn assert_delete_asset(_context: AssertDeleteAssetContext) -> Result<(), String> {
    Ok(())
}

include_satellite!();
