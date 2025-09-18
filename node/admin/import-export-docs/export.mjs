#!/usr/bin/env node

import { listDocs } from "@junobuild/core";
import { getIdentity } from "./auth.mjs";
import { writeFile } from "node:fs/promises";
import { jsonReplacer } from "@dfinity/utils";

const identity = await getIdentity();

const satellite = {
  identity,
  satelliteId: process.env.JUNO_SATELLITE_ID,
  container: "https://icp0.io",
};

const collection = process.env.JUNO_DATASTORE_COLLECTION;

const docs = await listDocs({
  collection,
  satellite,
});

const outputFile = process.env.DATA_SRC;

await writeFile(outputFile, JSON.stringify(docs, jsonReplacer, 2));

console.log(`Data exported to ${outputFile}`);
