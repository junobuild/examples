#!/usr/bin/env node

import { listDocs, setManyDocs } from "@junobuild/core";
import { getIdentity } from "./auth.mjs";
import { readFile } from "node:fs/promises";
import { jsonReviver } from "@dfinity/utils";

const identity = await getIdentity();

const satellite = {
  identity,
  satelliteId: process.env.JUNO_SATELLITE_ID,
  container: "https://icp0.io",
};

const collection = process.env.JUNO_DATASTORE_COLLECTION;

const inputFile = process.env.DATA_SRC;

const readData = async () => {
  const json = await readFile(inputFile, "utf-8");
  return JSON.parse(json, jsonReviver);
};

const { items } = await readData();

console.log(
  `⚠️  The documents will be imported using ${identity.getPrincipal().toText()} as owner.`,
);

console.log(`${items.length} documents to import`);

const limit = 2;

for (let i = 0; i < items.length; i = i + limit) {
  const batch = items.slice(i, i + limit);

  console.log(`Importing documents ${i + 1}/${i + batch.length}...`);

  await setManyDocs({
    docs: batch.map((doc) => ({
      collection,
      doc,
    })),
    satellite,
  });
}

console.log(`Data imported`);
