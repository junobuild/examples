import type { Doc } from "@junobuild/core";

export interface NoteData {
  text: string;
  url?: string;
}

export type Note = Doc<NoteData>;
