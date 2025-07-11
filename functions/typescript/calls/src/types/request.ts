import type { Doc } from "@junobuild/core";
import { z } from "zod/v4";

export const RequestDataSchema = z.object({
  status: z.enum(["submitted", "processed"]),
  amount: z.bigint(),
  fee: z.bigint().optional(),
});

export type RequestData = z.infer<typeof RequestDataSchema>;

export type RequestDoc = Doc<RequestData>;
