use crate::env::ICP_LEDGER_ID;
use candid::Principal;

pub fn icp_ledger_id() -> Result<Principal, String> {
    Principal::from_text(ICP_LEDGER_ID)
        .map_err(|_| "Cannot convert ICP ledger to Principal".to_string())
}
