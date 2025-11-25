import { Principal } from "@icp-sdk/core/principal";

export const E8S_PER_ICP = 100_000_000n;
export const IC_TRANSACTION_FEE_ICP = 10_000n;

export const COLLECTION_REQUEST = "request";

// TODO: Juno should inject those kind of variables with process.env for functions as well
// Mainnet: ryjl3-tyaaa-aaaaa-aaaba-cai
// Emulator: ryjl3-tyaaa-aaaaa-aaaba-cai
export const ICP_LEDGER_ID = Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
