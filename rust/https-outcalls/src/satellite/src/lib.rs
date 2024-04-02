use ic_cdk::api::management_canister::http_request::{
    http_request as http_request_outcall, CanisterHttpRequestArgument, HttpMethod,
};
use junobuild_macros::{
    assert_delete_asset, assert_delete_doc, assert_set_doc, assert_upload_asset, on_delete_asset,
    on_delete_doc, on_delete_many_assets, on_delete_many_docs, on_set_doc, on_set_many_docs,
    on_upload_asset,
};
use junobuild_satellite::{
    include_satellite, set_doc_store, AssertDeleteAssetContext, AssertDeleteDocContext,
    AssertSetDocContext, AssertUploadAssetContext, OnDeleteAssetContext, OnDeleteDocContext,
    OnDeleteManyAssetsContext, OnDeleteManyDocsContext, OnSetDocContext, OnSetManyDocsContext,
    OnUploadAssetContext, SetDoc,
};
use junobuild_utils::encode_doc_data;
use serde::{Deserialize, Serialize};

// The data of the document we are looking to update in the Satellite's Datastore.
#[derive(Serialize, Deserialize)]
struct DogData {
    src: Option<String>,
}

// We are using the Dog CEO API in this example.
// https://dog.ceo/dog-api/
//
// Its endpoint "random" returns such JSON data:
// {
//     "message": "https://images.dog.ceo/breeds/mountain-swiss/n02107574_1118.jpg",
//     "status": "success"
// }
//
// That's why we declare a struct that matches the structure of the answer.
#[derive(Serialize, Deserialize)]
struct DogApiResponse {
    message: String,
    status: String,
}

#[on_set_doc(collections = ["dogs"])]
async fn on_set_doc(context: OnSetDocContext) -> Result<(), String> {
    // 1. Prepare the HTTP GET request
    let url = "https://dog.ceo/api/breeds/image/random".to_string();

    let request_headers = vec![];

    let request = CanisterHttpRequestArgument {
        url,
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        // In this simple example we skip sanitizing the response with a custom function for simplicity reason.
        transform: None,
        // We do not require any particular HTTP headers in this example.
        headers: request_headers,
    };

    // 2. Execute the HTTP request. A request consumes Cycles(!). In this example we provide 2_000_000_000 Cycles (= 0.002 TCycles).
    // To estimate the costs see documentation:
    // - https://internetcomputer.org/docs/current/developer-docs/gas-cost#special-features
    // - https://internetcomputer.org/docs/current/developer-docs/integrations/https-outcalls/https-outcalls-how-it-works#pricing
    // Total amount of cycles depends on the subnet size. Therefore, on mainnet it might cost ~13x more than what's required when developing locally. Source: https://forum.dfinity.org/t/http-outcalls-cycles/27439/4
    // Note: In the future we will have a UI logging panel in console.juno.build to help debug on production. Follow PR https://github.com/junobuild/juno/issues/415.
    //
    // We rename ic_cdk::api::management_canister::http_request::http_request to http_request_outcall because the Satellite already includes such a function's name.
    match http_request_outcall(request, 2_000_000_000).await {
        Ok((response,)) => {
            // 3. Use serde_json to transform the response to a structured object.
            let str_body = String::from_utf8(response.body)
                .expect("Transformed response is not UTF-8 encoded.");

            let dog_response: DogApiResponse =
                serde_json::from_str(&str_body).map_err(|e| e.to_string())?;

            // 4. Our goal is to update the document in the Datastore with an update that contains the link to the image fetched from the API we just called.
            let dog: DogData = DogData {
                src: Some(dog_response.message),
            };

            // 5. We encode those data back to blob because the Datastore holds data as blob.
            let encode_data = encode_doc_data(&dog)?;

            // 6. Then we construct the parameters required to call the function that save the data in the Datastore.
            let doc: SetDoc = SetDoc {
                data: encode_data,
                description: context.data.data.after.description,
                updated_at: Some(context.data.data.after.updated_at),
            };

            // 7. We store the data in the Datastore for the same caller as the one who triggered the original on_set_doc, in the same collection with the same key as well.
            set_doc_store(
                context.caller,
                context.data.collection,
                context.data.key,
                doc,
            )?;

            Ok(())
        }
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
