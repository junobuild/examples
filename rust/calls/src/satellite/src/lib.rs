mod env;
mod ledger_icrc;
mod services;
mod types;
mod utils;

use crate::services::{assert_wallet_balance, set_request_processed, transfer_icp_from_wallet};
use crate::types::RequestData;
use crate::utils::icp_ledger_id;
use ic_cdk::id;
use icrc_ledger_types::icrc1::account::Account;
use junobuild_macros::on_set_doc;
use junobuild_satellite::{include_satellite, OnSetDocContext};
use junobuild_utils::decode_doc_data;

// Triggered when a new document is set in the "request" collection
#[on_set_doc(collections = ["request"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // ###############
    // Init data
    // ###############

    let data: RequestData = decode_doc_data(&context.data.data.after.data)?;

    let request_amount = data.amount.value;
    let fee = data.fee.as_ref().map(|fee| fee.value);

    let ledger_id = icp_ledger_id()?;

    let from_account: Account = Account::from(context.caller);

    // ###############
    // Check current account balance to fail early if funds are insufficient
    // ###############

    assert_wallet_balance(&ledger_id, &from_account, &request_amount, &fee).await?;

    // ###############
    // The request is about to be processed by transferring the amount via the ICP ledger.
    // We update the status beforehand. Since the function is atomic, a failed transfer reverts everything.
    // This avoids a case where the transfer succeeds but the status isn't updated — even if unlikely.
    // This is for demo only. In production, proper error handling and bookkeeping would be required.
    // ###############

    set_request_processed(context.data.key, &data, &context.data.data.after.version)?;

    // ###############
    // Transfer from wallet to satellite.
    // ###############

    let to_account: Account = Account::from(id());

    transfer_icp_from_wallet(
        &ledger_id,
        &from_account,
        &to_account,
        &request_amount,
        &fee,
    )
    .await?;

    Ok(())
}

include_satellite!();
