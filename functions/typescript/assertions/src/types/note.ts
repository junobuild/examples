import type { Doc } from "@junobuild/core";
import { z } from "zod/v4";

export const NoteDataSchema = z
  .object({
    text: z.string(),
    url: z.url().optional(),
  })
  .strict();

export type NoteData = z.infer<typeof NoteDataSchema>;

export type Note = Doc<NoteData>;
