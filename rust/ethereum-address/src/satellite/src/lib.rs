mod ecdsa;
mod eth;

use crate::ecdsa::ecdsa_pubkey_of;
use eth::pubkey_bytes_to_address;
use junobuild_macros::on_set_doc;
use junobuild_satellite::{include_satellite, set_doc_store, OnSetDocContext, SetDoc};
use junobuild_utils::encode_doc_data;
use serde::{Deserialize, Serialize};

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
    let data: UserData = UserData { eth_address };

    let encode_data = encode_doc_data(&data)?;

    let doc: SetDoc = SetDoc {
        data: encode_data,
        description: None,
        version: None,
    };

    set_doc_store(
        context.caller,
        "profiles".to_string(),
        context.data.key,
        doc,
    )?;

    Ok(())
}

include_satellite!();
