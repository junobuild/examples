use ic_cdk::management_canister::http_request as http_request_outcall;
use ic_cdk::management_canister::{HttpMethod, HttpRequestArgs};
use junobuild_macros::on_set_doc;
use junobuild_satellite::{include_satellite, set_doc_store, OnSetDocContext, SetDoc};
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

    let request = HttpRequestArgs {
        url,
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        // In this simple example we skip sanitizing the response with a custom function for simplicity reason.
        transform: None,
        // We do not require any particular HTTP headers in this example.
        headers: request_headers,
        // Use a single node as we do not require that a trust level for fetching a dog image for demo purposes. 😉
        is_replicated: Some(false),
    };

    // 2. Execute the HTTP request.
    // Note: we alias the function http_request to http_request_outcall just to prevent naming conflicts.
    match http_request_outcall(&request).await {
        Ok(response) => {
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
                version: context.data.data.after.version,
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
        Err(error) => {
            let message = format!("The http_request resulted into error: {error:?}");

            Err(message)
        }
    }
}

include_satellite!();
