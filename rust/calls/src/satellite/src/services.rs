use crate::ledger_icrc::{icrc_balance_of, icrc_transfer_from};
use crate::types::{RequestData, RequestStatus};
use candid::{Nat, Principal};
use ic_cdk::{id, print};
use icrc_ledger_types::icrc1::account::Account;
use junobuild_satellite::{set_doc_store, SetDoc};
use junobuild_utils::encode_doc_data;

/// Asserts that the given account has enough balance to cover the amount and fee.
///
/// # Arguments
/// * `ledger_id` - Principal of the ICRC ledger canister.
/// * `from_account` - The account to check balance for.
/// * `amount` - Amount to be transferred.
/// * `fee` - Optional fee to include in the check.
///
/// # Errors
/// Returns an error if the balance is insufficient or the call fails.
pub async fn assert_wallet_balance(
    ledger_id: &Principal,
    from_account: &Account,
    amount: &u64,
    fee: &Option<u64>,
) -> Result<(), String> {
    let balance = icrc_balance_of(&ledger_id, &from_account).await?;

    let total = amount.saturating_add(fee.unwrap_or(10_000u64));

    if balance < total {
        return Err(format!("Balance {} is smaller than {}", balance, total));
    }

    Ok(())
}

/// Transfers ICP from one account to another using `icrc2_transfer_from`.
///
/// # Arguments
/// * `ledger_id` - Principal of the ICRC ledger canister.
/// * `from_account` - The source account (must have granted approval).
/// * `to_account` - The destination account.
/// * `amount` - The amount to transfer.
/// * `fee` - Optional transfer fee.
///
/// # Errors
/// Returns an error if the call fails or the ledger returns a transfer error.
pub async fn transfer_icp_from_wallet(
    ledger_id: &Principal,
    from_account: &Account,
    to_account: &Account,
    amount: &u64,
    fee: &Option<u64>,
) -> Result<(), String> {
    let result = icrc_transfer_from(
        &ledger_id,
        &from_account,
        &to_account,
        &Nat::from(amount.clone()),
        &fee.map(|fee| Nat::from(fee)),
    )
    .await
    .map_err(|e| format!("Failed to call ICRC ledger icrc_transfer_from: {:?}", e))
    .and_then(|result| {
        result.map_err(|e| format!("Failed to execute the transfer from: {:?}", e))
    })?;

    print(format!("Result of the transfer from is {:?}", result));

    Ok(())
}

/// Updates the request document status to `Processed`.
///
/// # Arguments
/// * `key` - Document key in the "request" collection.
/// * `original_data` - Original request data.
/// * `original_version` - Optional document version for optimistic concurrency.
///
/// # Errors
/// Returns an error if encoding or document update fails.
pub fn set_request_processed(
    key: String,
    original_data: &RequestData,
    original_version: &Option<u64>,
) -> Result<(), String> {
    let update_data: RequestData = RequestData {
        status: RequestStatus::Processed,
        ..original_data.clone()
    };

    let data = encode_doc_data(&update_data)?;

    let doc: SetDoc = SetDoc {
        data,
        description: None,
        version: original_version.clone(),
    };

    let _ = set_doc_store(id(), "request".to_string(), key, doc)?;

    Ok(())
}
