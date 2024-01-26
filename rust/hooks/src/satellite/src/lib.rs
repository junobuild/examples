use junobuild_macros::{on_delete_doc, on_delete_many_docs, on_set_doc, on_set_many_docs};
use junobuild_satellite::{
    include_satellite, OnDeleteDocContext, OnDeleteManyDocsContext, OnSetDocContext,
    OnSetManyDocsContext,
};
use ic_cdk::print;

#[on_set_doc(collections = ["demo"])]
async fn on_set_doc(_context: OnSetDocContext) -> Result<(), String> {
    print("Hi, how are you doing?");

    Ok(())
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

include_satellite!();
