import { Principal } from "@icp-sdk/core/principal";
import {
  type AssertSetDoc,
  defineAssert,
  defineHook,
  type OnSetDoc,
} from "@junobuild/functions";
import { IcrcLedgerDid } from "@junobuild/functions/canisters/ledger/icrc";
import { id } from "@junobuild/functions/ic-cdk";
import { decodeDocData } from "@junobuild/functions/sdk";
import { COLLECTION_REQUEST, ICP_LEDGER_ID } from "../constants/app.constants";
import { RequestData, RequestDataSchema } from "../types/request";
import {
  assertWalletBalance,
  setRequestProcessed,
  transferIcpFromWallet,
} from "./services";

export const assertSetDoc = defineAssert<AssertSetDoc>({
  collections: [COLLECTION_REQUEST],
  assert: (context) => {
    // We validate that the data submitted for create or update matches the expected schema.
    const person = decodeDocData<RequestData>(context.data.data.proposed.data);

    RequestDataSchema.parse(person);
  },
});

export const onSetDoc = defineHook<OnSetDoc>({
  collections: [COLLECTION_REQUEST],
  run: async (context) => {
    // ###############
    // Init data
    // ###############

    const {
      data: {
        key,
        data: {
          after: { version },
        },
      },
    } = context;

    const data = decodeDocData<RequestData>(context.data.data.after.data);

    const { amount: requestAmount, fee } = data;

    const ledgerId = ICP_LEDGER_ID;

    const fromAccount: IcrcLedgerDid.Account = {
      owner: Principal.fromUint8Array(context.caller),
      subaccount: [],
    };

    // ###############
    // Check current account balance. This way the process can stop early on
    // ###############
    await assertWalletBalance({
      ledgerId,
      fromAccount,
      amount: requestAmount,
      fee,
    });

    // ###############
    // The request is about to be processed by transferring the amount via the ICP ledger.
    // We update the status beforehand. Since the function is atomic, a failed transfer reverts everything.
    // This avoids a case where the transfer succeeds but the status isn't updated — even if unlikely.
    // This is for demo only. In production, proper error handling and bookkeeping would be required.
    // ###############

    setRequestProcessed({
      key,
      version,
      data,
    });

    // ###############
    // Transfer from wallet to satellite.
    // ###############

    const toAccount: IcrcLedgerDid.Account = {
      owner: id(),
      subaccount: [],
    };

    await transferIcpFromWallet({
      ledgerId,
      fromAccount,
      toAccount,
      amount: requestAmount,
      fee,
    });
  },
});
