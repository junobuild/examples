import type { Doc } from "@junobuild/core";

export interface RequestData {
  status: "submitted" | "processed";
  amount: bigint;
  fee?: bigint;
}

export type RequestDoc = Doc<RequestData>;
