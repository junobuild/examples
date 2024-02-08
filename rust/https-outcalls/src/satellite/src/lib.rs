use std::fs::metadata;
use junobuild_macros::{
    on_delete_asset, on_delete_doc, on_delete_many_assets, on_delete_many_docs, on_set_doc,
    on_set_many_docs, on_upload_asset,
};
use junobuild_satellite::{
    include_satellite, OnDeleteAssetContext, OnDeleteDocContext, OnDeleteManyAssetsContext,
    OnDeleteManyDocsContext, OnSetDocContext, OnSetManyDocsContext, OnUploadAssetContext,
};
use ic_cdk::api::management_canister::http_request::{
    http_request as http_request_out, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse, TransformArgs,
    TransformContext,
};
use serde::{Serialize, Deserialize};
use serde_json::{self, Value};

// This struct is legacy code and is not really used in the code.
#[derive(Serialize, Deserialize)]
struct Context {
    bucket_start_time_index: usize,
    closing_price_index: usize,
}

#[on_set_doc]
async fn on_set_doc(_context: OnSetDocContext) -> Result<(), String> {
//2. SETUP ARGUMENTS FOR HTTP GET request

    // 2.1 Setup the URL and its query parameters
    type Timestamp = u64;
    let start_timestamp: Timestamp = 1682978460; //May 1, 2023 22:01:00 GMT
    let seconds_of_time: u64 = 60; //we start with 60 seconds
    let host = "api.pro.coinbase.com";
    let url = format!(
        "https://{}/products/ICP-USD/candles?start={}&end={}&granularity={}",
        host,
        start_timestamp.to_string(),
        start_timestamp.to_string(),
        seconds_of_time.to_string()
    );

    // 2.2 prepare headers for the system http_request call
    //Note that `HttpHeader` is declared in line 4
    let request_headers = vec![
        HttpHeader {
            name: "Host".to_string(),
            value: format!("{host}:443"),
        },
        HttpHeader {
            name: "User-Agent".to_string(),
            value: "exchange_rate_canister".to_string(),
        },
    ];


    // This struct is legacy code and is not really used in the code. Need to be removed in the future
    // The "TransformContext" function does need a CONTEXT parameter, but this implementation is not necessary
    // the TransformContext(transform, context) below accepts this "context", but it does nothing with it in this implementation.
    // bucket_start_time_index and closing_price_index are meaninglesss
    let context = Context {
        bucket_start_time_index: 0,
        closing_price_index: 4,
    };

    //note "CanisterHttpRequestArgument" and "HttpMethod" are declared in line 4
    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        body: None,               //optional for request
        max_response_bytes: None, //optional for request
        transform: None,          //optional for request
        headers: request_headers,
    };

    match http_request_out(request, 2_000_000_000).await {
        Ok((response,)) => {

            Ok(())
        },
        Err((r, m)) => {
            let message =
                format!("The http_request resulted into error. RejectionCode: {r:?}, Error: {m}");

            Err(message)
        }
    }
}

#[on_set_many_docs]
async fn on_set_many_docs(_context: OnSetManyDocsContext) -> Result<(), String> {

    let url = "https://dog.ceo/api/breeds/image/random".to_string();

    let request_headers = vec![];

    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: None,
        headers: request_headers,
    };

    match http_request_out(request, 2_000_000_000).await {
        Ok((response,)) => {

            Ok(())
        },
        Err((r, m)) => {
            let message =
                format!("The http_request resulted into error. RejectionCode: {r:?}, Error: {m}");

            Err(message)
        }
    }
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

include_satellite!();
