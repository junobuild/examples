import { AccountIdentifier } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";
import type { User } from "@junobuild/core";
import { initLedger } from "./_ledger.services.ts";

export const getBalance = async ({
  user: { key },
}: {
  user: User;
}): Promise<bigint> => {
  const { accountBalance } = await initLedger();

  return await accountBalance({
    accountIdentifier: AccountIdentifier.fromPrincipal({
      principal: Principal.fromText(key),
    }),
    certified: false,
  });
};
