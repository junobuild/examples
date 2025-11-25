import { createAgent, nonNullish } from "@dfinity/utils";
import { LedgerCanister } from "@icp-sdk/canisters/ledger/icp";
import { unsafeIdentity } from "@junobuild/core";

export const initLedger = async (): Promise<LedgerCanister> => {
  const container = import.meta.env.VITE_CONTAINER;

  const host = container === true ? "http://127.0.0.1:5987" : container;

  const agent = await createAgent({
    identity: await unsafeIdentity(),
    ...(nonNullish(host) && { host, fetchRootKey: true }),
  });

  return LedgerCanister.create({
    agent,
  });
};
