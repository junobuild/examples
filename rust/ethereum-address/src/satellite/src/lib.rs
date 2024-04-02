mod eth;
mod ecdsa;

use junobuild_macros::{
    assert_delete_asset, assert_delete_doc, assert_set_doc, assert_upload_asset, on_delete_asset,
    on_delete_doc, on_delete_many_assets, on_delete_many_docs, on_set_doc, on_set_many_docs,
    on_upload_asset,
};
use junobuild_satellite::{include_satellite, AssertDeleteAssetContext, AssertDeleteDocContext, AssertSetDocContext, AssertUploadAssetContext, OnDeleteAssetContext, OnDeleteDocContext, OnDeleteManyAssetsContext, OnDeleteManyDocsContext, OnSetDocContext, OnSetManyDocsContext, OnUploadAssetContext, SetDoc, set_doc_store};
use junobuild_utils::encode_doc_data;
use serde::{Deserialize, Serialize};
use eth::{pubkey_bytes_to_address};
use crate::ecdsa::ecdsa_pubkey_of;

#[derive(Serialize, Deserialize)]
struct UserData {
    eth_address: String,
}

#[on_set_doc(collections = ["#user"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // Derive ETH address from user's principal
    // ⚠️ NOTE: This code has not been reviewed and may not be suitable for production use. ️⚠️
    let eth_address = pubkey_bytes_to_address(&ecdsa_pubkey_of(&context.caller).await);

    // Save address as user data (in a custom user collection)
    let data: UserData = UserData {
        eth_address
    };

    let encode_data = encode_doc_data(&data)?;

    let doc: SetDoc = SetDoc {
        data: encode_data,
        description: None,
        updated_at: None,
    };

    set_doc_store(
        context.caller,
        "users".to_string(),
        context.data.key,
        doc,
    )?;

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
