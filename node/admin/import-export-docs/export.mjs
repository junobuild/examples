import { listDocs } from "@junobuild/core";
import { writeFile } from "node:fs/promises";
import { jsonReplacer } from "@dfinity/utils";
import { defineRun } from "@junobuild/config";
import * as dotenv from "dotenv";

dotenv.config({ quiet: true });

const collection = process.env.JUNO_DATASTORE_COLLECTION;
const outputFile = process.env.DATA_SRC;

export const onRun = defineRun(() => ({
  run: async (context) => {
    const docs = await listDocs({
      collection,
      satellite: context,
    });

    await writeFile(outputFile, JSON.stringify(docs, jsonReplacer, 2));

    console.log(`Data exported to ${outputFile}`);
  },
}));
