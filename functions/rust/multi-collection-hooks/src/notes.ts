import { getDoc, setDoc, deleteDoc, type Doc } from "@junobuild/core";
import { nanoid } from "nanoid";

interface Note {
  title: string;
  body: string;
}

let noteRecord: Doc<Note> | undefined;
let noteKey: string | undefined;

const setNote = async () => {
  const title =
    (document.querySelector("#noteTitle") as HTMLInputElement)?.value || "";
  const body =
    (document.querySelector("#noteBody") as HTMLInputElement)?.value || "";

  noteKey = nanoid();

  noteRecord = await setDoc<Note>({
    collection: "notes",
    doc: {
      key: noteKey,
      data: { title, body },
      ...(noteRecord !== undefined && { updated_at: noteRecord.updated_at }),
    },
  });

  console.log("Note set", noteRecord);
};

const getNote = async () => {
  if (noteKey === undefined) {
    return;
  }

  noteRecord = await getDoc<Note>({
    collection: "notes",
    key: noteKey,
  });

  console.log("Note get", noteRecord);

  const result = document.querySelector("#result");
  if (result && noteRecord) {
    result.textContent = `Note: ${noteRecord.data.title} — ${noteRecord.data.body}`;
  }
};

const delNote = async () => {
  if (noteRecord === undefined) {
    return;
  }

  await deleteDoc<Note>({
    collection: "notes",
    doc: noteRecord,
  });

  noteRecord = undefined;
  console.log("Note deleted");
};

export const initNotes = () => {
  document
    .querySelector("#setNote")
    ?.addEventListener("click", setNote, { passive: true });
  document
    .querySelector("#getNote")
    ?.addEventListener("click", getNote, { passive: true });
  document
    .querySelector("#deleteNote")
    ?.addEventListener("click", delNote, { passive: true });
};
