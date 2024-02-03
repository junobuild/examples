import {
  getDoc,
  setDoc,
  type Doc,
  deleteDoc,
  setManyDocs,
  unsafeIdentity,
} from "@junobuild/core";
import { nanoid } from "nanoid";
import { Principal } from "@dfinity/principal";

interface Example {
  yolo: boolean;
  hello: string;
  principal: Principal;
  value: bigint
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
        principal: (await unsafeIdentity()).getPrincipal(),
        value: 123n
      },
      ...(record !== undefined && { updated_at: record.updated_at }),
    },
  });

  console.log("Set done", record);
};

const setMany = async () => {
  let tmpKey = nanoid();

  const doc1 = {
    collection: "demo",
    doc: {
      key: tmpKey,
      data: {
        yolo: true,
        hello: "world_" + tmpKey,
      },
    },
  };

  const doc2 = {
    collection: "demo_2",
    doc: {
      key: tmpKey,
      data: {
        yolo: true,
        hello: "world_" + tmpKey,
      },
    },
  };

  const result = await setManyDocs({
    docs: [doc1, doc2],
  });

  console.log("Set many done", result);
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
    .querySelector("#sayMany")
    ?.addEventListener("click", async () => await setMany(), { passive: true });
  document
    .querySelector("#read")
    ?.addEventListener("click", get, { passive: true });
  document
    .querySelector("#delete")
    ?.addEventListener("click", del, { passive: true });
};
