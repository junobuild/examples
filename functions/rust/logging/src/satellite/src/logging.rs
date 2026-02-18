//! Reusable logging utility for Juno serverless functions.
//!
//! Wraps `junobuild_satellite::{info, debug, warn, error}` to provide:
//! - A consistent `[Component] message` format
//! - Graceful fallback to `ic_cdk::print` before the RNG is seeded
//!
//! ## Usage
//!
//! ```rust
//! use crate::logging;
//!
//! logging::log_info("MyComponent", "Operation completed successfully");
//! logging::log_debug("MyComponent", &format!("Processing key={}", key));
//! logging::log_warn("MyComponent", "Skipping empty input");
//! logging::log_error("MyComponent", &format!("Failed: {}", err));
//! ```

/// Log at DEBUG level. Use for diagnostic/development messages.
pub fn log_debug(component: &str, message: &str) {
    let formatted = format!("[{}] {}", component, message);
    if let Err(_) = junobuild_satellite::debug(formatted) {
        ic_cdk::print(format!("[{}] {}", component, message));
    }
}

/// Log at INFO level. Use for successful operations and state changes.
pub fn log_info(component: &str, message: &str) {
    let formatted = format!("[{}] {}", component, message);
    if let Err(_) = junobuild_satellite::info(formatted) {
        ic_cdk::print(format!("[{}] {}", component, message));
    }
}

/// Log at WARN level. Use for skipped operations or unusual conditions.
pub fn log_warn(component: &str, message: &str) {
    let formatted = format!("[{}] {}", component, message);
    if let Err(_) = junobuild_satellite::warn(formatted) {
        ic_cdk::print(format!("[{}] {}", component, message));
    }
}

/// Log at ERROR level. Use for failed operations and error conditions.
pub fn log_error(component: &str, message: &str) {
    let formatted = format!("[{}] {}", component, message);
    if let Err(_) = junobuild_satellite::error(formatted) {
        ic_cdk::print(format!("[{}] {}", component, message));
    }
}
