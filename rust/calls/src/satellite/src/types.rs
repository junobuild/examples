use candid::Deserialize;
use junobuild_utils::DocDataBigInt;
use serde::Serialize;

#[derive(Serialize, Deserialize, Clone)]
pub struct RequestData {
    pub status: RequestStatus,
    pub amount: DocDataBigInt,
    pub fee: Option<DocDataBigInt>,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "snake_case")]
pub enum RequestStatus {
    Submitted,
    Processed,
}
