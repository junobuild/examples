import { encodeIcrcAccount } from "@dfinity/ledger-icrc";
import type { Account } from "@dfinity/ledger-icrc/dist/candid/icrc_ledger";
import type { Principal } from "@dfinity/principal";
import { fromNullable, jsonReplacer } from "@dfinity/utils";
import { SetDoc } from "@junobuild/functions";
import { id } from "@junobuild/functions/ic-cdk";
import { encodeDocData, setDocStore } from "@junobuild/functions/sdk";
import {
  COLLECTION_REQUEST,
  IC_TRANSACTION_FEE_ICP,
} from "../constants/app.constants";
import { RequestData } from "../types/request";
import { icrcBalanceOf, icrcTransferFrom } from "./ledger-icrc";

export const assertWalletBalance = async ({
  ledgerId,
  fromAccount,
  amount,
  fee,
}: {
  ledgerId: Principal;
  fromAccount: Account;
  amount: bigint;
  fee: bigint | undefined;
}) => {
  const balance = await icrcBalanceOf({
    ledgerId,
    account: fromAccount,
  });

  const total = amount + (fee ?? IC_TRANSACTION_FEE_ICP);

  if (balance < total) {
    const encodedAccountText = encodeIcrcAccount({
      owner: fromAccount.owner,
      subaccount: fromNullable(fromAccount.subaccount),
    });

    throw new Error(
      `Balance ${balance} is smaller than ${total} for account ${encodedAccountText}.`,
    );
  }
};

export const transferIcpFromWallet = async (params: {
  ledgerId: Principal;
  fromAccount: Account;
  toAccount: Account;
  amount: bigint;
  fee: bigint | undefined;
}): Promise<bigint> => {
  const result = await icrcTransferFrom(params);

  if ("Err" in result) {
    throw new Error(
      `Failed to transfer ICP from wallet: ${JSON.stringify(result, jsonReplacer)}`,
    );
  }

  return result.Ok;
};

export const setRequestProcessed = ({
  key,
  data: currentData,
  version: originalVersion,
}: {
  key: string;
  data: RequestData;
  version: bigint | undefined;
}) => {
  const updateData: RequestData = {
    ...currentData,
    status: "processed",
  };

  const data = encodeDocData(updateData);

  const doc: SetDoc = {
    data,
    version: originalVersion,
  };

  setDocStore({
    caller: id(),
    collection: COLLECTION_REQUEST,
    doc,
    key,
  });
};
