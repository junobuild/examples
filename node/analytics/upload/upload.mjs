#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { assertNonNullish } from "@dfinity/utils";
import { orbiterLocalActor } from "./actor.mjs";
import { listFiles, readData } from "./utils.mjs";

const identity = await getIdentity();

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

assertNonNullish(orbiterId, "Orbiter ID undefined.");

const { set_page_views } = await orbiterLocalActor({ orbiterId, identity });

const args = process.argv.slice(2);

const groupSize = 10;

const uploadPageViews = async (data) => {
  let batches = [];

  for (let start = 0; start < data.length; start += groupSize) {
    const batch = data.slice(start, start + groupSize);
    batches.push(batch);
  }

  console.log(batches)

  return { length: batches.length };
};

try {
  const files = await listFiles(args);

  let total = 0;

  for (const file of files) {
    const data = await readData(file);
    const { length } = await uploadPageViews(data);
    total += length;
  }

  console.log(`Analytics collected. ${total} page view's entries uploaded.`);
} catch (err) {
  console.error(err);
}
