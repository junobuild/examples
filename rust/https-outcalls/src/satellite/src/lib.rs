use junobuild_macros::{
    on_delete_asset, on_delete_doc, on_delete_many_assets, on_delete_many_docs, on_set_doc,
    on_set_many_docs, on_upload_asset,
};
use junobuild_satellite::{include_satellite, OnDeleteAssetContext, OnDeleteDocContext, OnDeleteManyAssetsContext, OnDeleteManyDocsContext, OnSetDocContext, OnSetManyDocsContext, OnUploadAssetContext, set_doc_store, SetDoc};
use ic_cdk::api::management_canister::http_request::{
    http_request as http_request_out, CanisterHttpRequestArgument, HttpMethod, HttpResponse,
};
use ic_cdk::print;
use junobuild_utils::{encode_doc_data};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct Dog {
    src: Option<String>,
}

#[derive(Serialize, Deserialize)]
struct DogApiResponse {
    message: String,
    status: String,
}

#[on_set_doc]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
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
            let str_body = String::from_utf8(response.body)
                .expect("Transformed response is not UTF-8 encoded.");

            print(format!("Response -------------> {}", str_body));

            let dog_response: DogApiResponse = serde_json::from_str(&str_body).map_err(|e| e.to_string())?;

            let dog: Dog = Dog {
                src: Some(dog_response.message)
            };

            let encode_data = encode_doc_data(&dog)?;

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

include_satellite!();
