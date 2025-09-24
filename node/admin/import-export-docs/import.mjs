import { setManyDocs } from "@junobuild/core";
import { readFile } from "node:fs/promises";
import { jsonReviver } from "@dfinity/utils";
import * as dotenv from "dotenv";
import { defineRun } from "@junobuild/config";

dotenv.config({ quiet: true });

const collection = process.env.JUNO_DATASTORE_COLLECTION;
const inputFile = process.env.DATA_SRC;

const readData = async () => {
  const json = await readFile(inputFile, "utf-8");
  return JSON.parse(json, jsonReviver);
};

export const onRun = defineRun(() => ({
  run: async ({ identity, ...rest }) => {
    const { items } = await readData();

    console.log(
      `⚠️  The documents will be imported using ${identity.getPrincipal().toText()} as owner.`,
    );

    console.log(`${items.length} documents to import`);

    const limit = 10;

    for (let i = 0; i < items.length; i = i + limit) {
      const batch = items.slice(i, i + limit);

      console.log(`Importing documents ${i + 1}/${i + batch.length}...`);

      await setManyDocs({
        docs: batch.map((doc) => ({
          collection,
          doc,
        })),
        satellite: {
          identity,
          ...rest,
        },
      });
    }

    console.log(`Data imported`);
  },
}));
