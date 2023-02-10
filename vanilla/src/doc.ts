import { getDoc, setDoc, listDocs, type Doc, delDoc } from "@junobuild/core";

interface Example {
    yolo: boolean;
    hello: string;
}

let record: Doc<Example> | undefined;

const key = "my_id";

const set = async (k?: string) => {
  record = await setDoc<Example>({
    collection: "demo",
    doc: {
      key: k ?? key,
      data: {
        yolo: true,
        hello: "world",
      },
      ...(record !== undefined && {updated_at: record.updated_at}),
    },
  });

  console.log("Set done", record);
};

const set50x = async () => {
    const arr = [...Array(50).keys()];

    await Promise.all(arr.map((n) => set(`my_id_${n}`)));

    console.log("Set 50x done");
};

const del = async () => {
    if (record === undefined) {
        return;
    }

    await delDoc<Example>({
        collection: "demo",
        doc: record,
    });

    record = undefined;

    console.log("Delete done");
};

const get = async () => {
    record = await getDoc({
        collection: "demo",
        key,
    });

    console.log("Get done", record);
}

const list = async () =>
    console.log("List",
        await listDocs({
          collection: "demo",
          filter: {},
        })
    );

export const initDoc = () => {
  document
    .querySelector("#say")
    ?.addEventListener("click", async () => await set(), { passive: true });
    document
        .querySelector("#say50x")
        ?.addEventListener("click", set50x, { passive: true });
  document
    .querySelector("#read")
    ?.addEventListener("click", get, { passive: true });
  document
      .querySelector("#list")
      ?.addEventListener("click", list, { passive: true });
    document
        .querySelector("#delete")
        ?.addEventListener("click", del, { passive: true });
};
