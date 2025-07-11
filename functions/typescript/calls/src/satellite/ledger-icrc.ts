import { IDL } from "@dfinity/candid";
import type {
  Account as AccountType,
  TransferFromArgs as TransferFromArgsType,
  TransferFromResult as TransferFromResultType,
} from "@dfinity/ledger-icrc/dist/candid/icrc_ledger";
import { Principal } from "@dfinity/principal";
import { toNullable } from "@dfinity/utils";
import { call } from "@junobuild/functions/ic-cdk";

const SubAccount = IDL.Vec(IDL.Nat8);

const Account = IDL.Record({
  owner: IDL.Principal,
  subaccount: IDL.Opt(SubAccount),
});

const Tokens = IDL.Nat;
const Timestamp = IDL.Nat64;

const TransferFromArgs = IDL.Record({
  to: Account,
  fee: IDL.Opt(Tokens),
  spender_subaccount: IDL.Opt(SubAccount),
  from: Account,
  memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
  created_at_time: IDL.Opt(Timestamp),
  amount: Tokens,
});

const BlockIndex = IDL.Nat;

const TransferFromError = IDL.Variant({
  GenericError: IDL.Record({
    message: IDL.Text,
    error_code: IDL.Nat,
  }),
  TemporarilyUnavailable: IDL.Null,
  InsufficientAllowance: IDL.Record({ allowance: Tokens }),
  BadBurn: IDL.Record({ min_burn_amount: Tokens }),
  Duplicate: IDL.Record({ duplicate_of: BlockIndex }),
  BadFee: IDL.Record({ expected_fee: Tokens }),
  CreatedInFuture: IDL.Record({ ledger_time: Timestamp }),
  TooOld: IDL.Null,
  InsufficientFunds: IDL.Record({ balance: Tokens }),
});

const TransferFromResult = IDL.Variant({
  Ok: BlockIndex,
  Err: TransferFromError,
});

export const icrcBalanceOf = ({
  ledgerId,
  account,
}: {
  ledgerId: Principal;
  account: AccountType;
}): Promise<bigint> =>
  call<bigint>({
    canisterId: ledgerId,
    method: "icrc1_balance_of",
    args: [[Account, account]],
    result: Tokens,
  });

export const icrcTransferFrom = async ({
  ledgerId,
  fromAccount,
  toAccount,
  amount,
  fee,
}: {
  ledgerId: Principal;
  fromAccount: AccountType;
  toAccount: AccountType;
  amount: bigint;
  fee: bigint | undefined;
}): Promise<TransferFromResultType> => {
  const args: TransferFromArgsType = {
    amount,
    from: fromAccount,
    to: toAccount,
    created_at_time: toNullable(),
    fee: toNullable(fee),
    memo: toNullable(),
    spender_subaccount: toNullable(),
  };

  return await call<TransferFromResultType>({
    canisterId: ledgerId,
    method: "icrc2_transfer_from",
    args: [[TransferFromArgs, args]],
    result: TransferFromResult,
  });
};
