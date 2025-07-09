use junobuild_satellite::{list_assets_store, set_asset_handler, Doc};
use junobuild_shared::types::core::Key;
use junobuild_shared::types::list::ListParams;
use junobuild_storage::http::types::HeaderField;
use junobuild_storage::types::store::AssetKey;
use junobuild_utils::{decode_doc_data, encode_doc_data_to_string};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Note {
    text: String,
    url: Option<String>,
}

pub fn generate_note(key: &Key, doc: &Doc) -> Result<(), String> {
    // 1. Get the note that was persisted
    let note: Note = decode_doc_data(&doc.data)?;

    // 2. Transform it to a JSON string
    let json = encode_doc_data_to_string(&note)?;

    // 3. Save it as a JSON asset in the Storage
    let name = format!("{}.json", key).clone();

    insert_asset(&name, &json)
}

const STORAGE_COLLECTION: &str = "json";

pub fn generate_list_of_notes() -> Result<(), String> {
    // 1. Search for all notes in the collection "notes"
    let params: ListParams = ListParams {
        matcher: None,
        paginate: None,
        order: None,
        owner: None,
    };

    let result = list_assets_store(ic_cdk::id(), &STORAGE_COLLECTION.to_string(), &params)?;

    // 2. Map results to the full_path which is the only information we are interested in.
    let list_of_keys: Vec<String> = result
        .items
        .iter()
        .map(|(_, asset)| asset.key.full_path.clone())
        .collect();

    // 3. Convert the list to a JSON string.
    let json = encode_doc_data_to_string(&list_of_keys)?;

    let name = "notes.json".to_string();

    // 4. Insert the JSON in the memory of the smart contract - i.e. expose the content on the web.
    insert_asset(&name, &json)?;

    Ok(())
}

fn insert_asset(name: &String, json: &String) -> Result<(), String> {
    ic_cdk::print(format!("Json: {} {}", name, json));

    let full_path = format!("/{}/{}", STORAGE_COLLECTION, name.clone()).to_string();

    let key: AssetKey = AssetKey {
        name: name.clone(),
        full_path: full_path.clone(),
        token: None,
        collection: STORAGE_COLLECTION.to_string(),
        owner: ic_cdk::id(),
        description: None,
    };

    let headers = vec![HeaderField(
        "content-type".to_string(),
        "application/json".to_string(),
    )];

    set_asset_handler(&key, &json.as_bytes().to_vec(), &headers)?;

    ic_cdk::print(format!(
        "Asset saved in Storage: http://{}.localhost:5987{}",
        ic_cdk::id(),
        full_path
    ));

    Ok(())
}
