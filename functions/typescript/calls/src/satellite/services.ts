import { fromNullable, jsonReplacer, toNullable } from "@dfinity/utils";
import { encodeIcrcAccount } from "@icp-sdk/canisters/ledger/icrc";
import type { Principal } from "@icp-sdk/core/principal";
import { SetDoc } from "@junobuild/functions";
import {
  IcrcLedgerCanister,
  type IcrcLedgerDid,
} from "@junobuild/functions/canisters/ledger/icrc";
import { id } from "@junobuild/functions/ic-cdk";
import { encodeDocData, setDocStore } from "@junobuild/functions/sdk";
import {
  COLLECTION_REQUEST,
  IC_TRANSACTION_FEE_ICP,
} from "../constants/app.constants";
import { RequestData } from "../types/request";

export const assertWalletBalance = async ({
  ledgerId,
  fromAccount,
  amount,
  fee,
}: {
  ledgerId: Principal;
  fromAccount: IcrcLedgerDid.Account;
  amount: bigint;
  fee: bigint | undefined;
}) => {
  const { icrc1BalanceOf } = new IcrcLedgerCanister({ canisterId: ledgerId });

  const balance = await icrc1BalanceOf({
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

export const transferIcpFromWallet = async ({
  ledgerId,
  fromAccount,
  amount,
  fee,
  toAccount,
}: {
  ledgerId: Principal;
  fromAccount: IcrcLedgerDid.Account;
  toAccount: IcrcLedgerDid.Account;
  amount: bigint;
  fee: bigint | undefined;
}): Promise<IcrcLedgerDid.Tokens> => {
  const args: IcrcLedgerDid.TransferFromArgs = {
    amount,
    from: fromAccount,
    to: toAccount,
    created_at_time: toNullable(),
    fee: toNullable(fee),
    memo: toNullable(),
    spender_subaccount: toNullable(),
  };

  const { icrc2TransferFrom } = new IcrcLedgerCanister({
    canisterId: ledgerId,
  });

  const result = await icrc2TransferFrom({ args });

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
