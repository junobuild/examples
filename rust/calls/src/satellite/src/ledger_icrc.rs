use candid::{Nat, Principal};
use ic_cdk::api::call::CallResult;
use ic_cdk::call;
use icrc_ledger_types::icrc1::account::Account;
use icrc_ledger_types::icrc2::transfer_from::{TransferFromArgs, TransferFromError};

/// Returns the balance of the given ICRC account by calling `icrc1_balance_of`.
///
/// # Arguments
/// * `ledger_id` - Principal of the ICRC ledger canister.
/// * `account` - The ICRC account to query.
///
/// # Errors
/// Returns a `String` error if the canister call fails.
pub async fn icrc_balance_of(ledger_id: &Principal, account: &Account) -> Result<Nat, String> {
    let (result,): (Nat,) = call(ledger_id.clone(), "icrc1_balance_of", (account,))
        .await
        .map_err(|e| format!("Failed to call ICRC ledger icrc_balance_of: {:?}", e))
        .map_err(|e| format!("Failed to get the balance: {:?}", e))?;

    Ok(result)
}

/// Transfers tokens from one ICRC account to another using `icrc2_transfer_from`.
/// The transfer must have been previously approved by the `from_account` for the caller (spender, the satellite).
///
/// # Arguments
/// * `ledger_id` - Principal of the ICRC ledger canister.
/// * `from_account` - Account to debit from.
/// * `to_account` - Account to credit to.
/// * `amount` - Amount of tokens to transfer.
/// * `fee` - Optional transfer fee.
///
/// # Returns
/// A `Result` containing either the transferred amount or a `TransferFromError`.
///
/// # Errors
/// Returns a `CallResult` error if the canister call fails.
pub async fn icrc_transfer_from(
    ledger_id: &Principal,
    from_account: &Account,
    to_account: &Account,
    amount: &Nat,
    fee: &Option<Nat>,
) -> CallResult<Result<Nat, TransferFromError>> {
    let args: TransferFromArgs = TransferFromArgs {
        amount: amount.clone(),
        from: from_account.clone(),
        to: to_account.clone(),
        created_at_time: None,
        fee: fee.clone(),
        memo: None,
        spender_subaccount: None,
    };

    let (result,): (Result<Nat, TransferFromError>,) =
        call(ledger_id.clone(), "icrc2_transfer_from", (args,)).await?;
    Ok(result)
}
