import { getDoc, setDoc, type Doc, deleteDoc } from "@junobuild/core";
import { nanoid } from "nanoid";

interface Example {
  yolo: boolean;
  hello: string;
}

let record: Doc<Example> | undefined;

let key: string | undefined;

const set = async () => {
  key = nanoid();

  record = await setDoc<Example>({
    collection: "demo",
    doc: {
      key,
      data: {
        yolo: true,
        hello: "world",
      },
      ...(record !== undefined && { updated_at: record.updated_at }),
    },
  });

  console.log("Set done", record);
};

const del = async () => {
  if (record === undefined) {
    return;
  }

  await deleteDoc<Example>({
    collection: "demo",
    doc: record,
  });

  record = undefined;

  console.log("Delete done");
};

const get = async () => {
  if (key === undefined) {
    return;
  }

  record = await getDoc({
    collection: "demo",
    key,
  });

  console.log("Get done", record);
};

export const initDoc = () => {
  document
    .querySelector("#say")
    ?.addEventListener("click", async () => await set(), { passive: true });
  document
    .querySelector("#read")
    ?.addEventListener("click", get, { passive: true });
  document
    .querySelector("#delete")
    ?.addEventListener("click", del, { passive: true });
};
