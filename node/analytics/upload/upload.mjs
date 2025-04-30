#!/usr/bin/env node

import { assertNonNullish, jsonReplacer, nonNullish } from "@dfinity/utils";
import { orbiterLocalActor } from "./actor.mjs";
import { listFiles, readData } from "./utils.mjs";
import { Principal } from "@dfinity/principal";
import { AnonymousIdentity } from "@dfinity/agent";
import * as dotenv from "dotenv";

dotenv.config();

const identity = new AnonymousIdentity();

console.log("");
// prettier-ignore
console.log(" █████╗ ███╗   ██╗ █████╗ ██╗  ██╗   ██╗████████╗██╗ ██████╗███████╗");
// prettier-ignore
console.log("██╔══██╗████╗  ██║██╔══██╗██║  ╚██╗ ██╔╝╚══██╔══╝██║██╔════╝██╔════╝");
// prettier-ignore
console.log("███████║██╔██╗ ██║███████║██║   ╚████╔╝    ██║   ██║██║     ███████╗");
// prettier-ignore
console.log("██╔══██║██║╚██╗██║██╔══██║██║    ╚██╔╝     ██║   ██║██║     ╚════██║");
// prettier-ignore
console.log("██║  ██║██║ ╚████║██║  ██║███████╗██║      ██║   ██║╚██████╗███████║");
// prettier-ignore
console.log("╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝      ╚═╝   ╚═╝ ╚═════╝╚══════╝");

console.log(`\n[Your CLI identity: ${identity.getPrincipal().toText()}]\n`);

const orbiterId = process.env.ORBITER_ID;
const satelliteId = process.env.SATELLITE_ID;

assertNonNullish(orbiterId, "Orbiter ID undefined.");

const { set_page_views } = await orbiterLocalActor({ orbiterId, identity });

const args = process.argv.slice(2);

const groupSize = 1000;

const batchUploadPageViews = async (data) => {
  let batches = [];

  for (let start = 0; start < data.length; start += groupSize) {
    const batch = data.slice(start, start + groupSize);
    batches.push(batch);
  }

  for await (const result of batchUpload({ batches })) {
  }

  return { length: data.length };
};

async function* batchUpload({ batches, limit = 12 }) {
  for (let i = 0; i < batches.length; i = i + limit) {
    const batch = batches.slice(i, i + limit);
    const result = await Promise.all(
      batch.map((data) => uploadPageViews(data)),
    );
    yield result;
  }
}

const uploadPageViews = async (data) => {
  const setPageViewsData = data.map(
    ([
      key,
      { version: ___, created_at: _, updated_at: __, satellite_id, ...value },
    ]) => [
      key,
      {
        ...value,
        updated_at: [],
        version: [],
        satellite_id: nonNullish(satelliteId)
          ? Principal.fromText(satelliteId)
          : satellite_id,
      },
    ],
  );

  const result = await set_page_views(setPageViewsData);

  if ("Err" in result) {
    console.log("Error uploading page views:", JSON.stringify(result, jsonReplacer));
    return;
  }

  console.log("Upload page views success:", result);
};

try {
  const files = await listFiles(args);

  let total = 0;

  for (const file of files) {
    const data = await readData(file);
    const { length } = await batchUploadPageViews(data);
    total += length;
  }

  console.log(`Analytics collected. ${total} page view's entries uploaded.`);
} catch (err) {
  console.error(err);
}
