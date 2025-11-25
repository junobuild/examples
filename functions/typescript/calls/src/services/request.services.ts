import { nowInBigIntNanoSeconds } from "@dfinity/utils";
import { Icrc2ApproveRequest } from "@icp-sdk/canisters/ledger/icp";
import { Principal } from "@icp-sdk/core/principal";
import { type Doc, setDoc } from "@junobuild/core";
import {
  COLLECTION_REQUEST,
  IC_TRANSACTION_FEE_ICP,
} from "../constants/app.constants.ts";
import type { RequestData } from "../types/request.ts";
import { initLedger } from "./_ledger.services.ts";

export const approveAndRequest = async (): Promise<{ requestKey: string }> => {
  const transferFee = IC_TRANSACTION_FEE_ICP;

  const fixedAmount = 1_000_000_000n;

  // The wallet will pay for the fee of the transfer
  const approveAmount = fixedAmount + transferFee;

  await approve({
    amount: approveAmount,
  });

  const { requestKey } = await request({
    amount: fixedAmount,
  });

  return { requestKey };
};

const request = async ({
  amount,
}: {
  amount: bigint;
}): Promise<{ requestKey: string }> => {
  const requestKey = crypto.randomUUID();

  const doc: Doc<RequestData> = {
    key: requestKey,
    data: {
      status: "submitted",
      amount,
    },
  };

  await setDoc({
    collection: COLLECTION_REQUEST,
    doc,
  });

  return { requestKey };
};

const approve = async ({ amount }: { amount: bigint }) => {
  const FIVE_MINUTES = 5n * 60n * 1000n * 1000n * 1000n;

  const SATELLITE_ID = import.meta.env.VITE_SATELLITE_ID;

  const request: Icrc2ApproveRequest = {
    spender: {
      owner: Principal.fromText(SATELLITE_ID),
      subaccount: [],
    },
    amount,
    expires_at: nowInBigIntNanoSeconds() + FIVE_MINUTES,
  };

  const { icrc2Approve } = await initLedger();
  await icrc2Approve(request);
};
