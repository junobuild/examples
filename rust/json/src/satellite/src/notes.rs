use ic_cdk::id;
use junobuild_satellite::{list_assets_store, set_asset_handler};
use junobuild_shared::types::list::ListParams;
use junobuild_storage::http::types::HeaderField;
use junobuild_storage::types::store::AssetKey;
use junobuild_utils::encode_doc_data_to_string;

pub fn generate_list_of_notes() -> Result<(), String> {
    // 1. Search for all notes in the collection "notes"
    let params: ListParams = ListParams {
        matcher: None,
        paginate: None,
        order: None,
        owner: None,
    };

    let result = list_assets_store(id(), &"notes".to_string(), &params)?;

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

pub fn insert_asset(name: &String, json: &String) -> Result<(), String> {
    ic_cdk::print(format!("Json: {} {}", name, json));

    let collection = "notes".to_string();

    let key: AssetKey = AssetKey {
        name: name.clone(),
        full_path: format!("/{}/{}", collection, name.clone()).to_string(),
        token: None,
        collection,
        owner: id(),
        description: None,
    };

    let headers = vec![HeaderField(
        "content-type".to_string(),
        "application/json".to_string(),
    )];

    set_asset_handler(&key, &json.as_bytes().to_vec(), &headers)
}
