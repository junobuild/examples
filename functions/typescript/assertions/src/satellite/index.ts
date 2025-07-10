import { type AssertSetDoc, defineAssert } from "@junobuild/functions";
import { decodeDocData } from "@junobuild/functions/sdk";
import { type NoteData, NoteDataSchema } from "../types/note";

export const assertSetDoc = defineAssert<AssertSetDoc>({
  collections: ["notes"],
  assert: (context) => {
    const note = decodeDocData<NoteData>(context.data.data.proposed.data);

    NoteDataSchema.parse(note);

    if (note.text.toLowerCase().includes("hello")) {
      console.log("❌ Rejected note containing 'hello':", note.text);
      throw new Error("The note should not contain the keyword 'hello'.");
    }
  },
});
