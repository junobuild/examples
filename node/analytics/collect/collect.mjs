#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { assertNonNullish, jsonReplacer } from "@dfinity/utils";
import { orbiterActor } from "./actor.mjs";
import { buildPeriods } from "./utils.mjs";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

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

assertNonNullish(orbiterId, "Satellite ID undefined.");

const { get_page_views } = await orbiterActor({ orbiterId, identity });

const args = process.argv.slice(2);

const collectPageViews = async ({ from, to, fromText, toText }) => {
  const pageViews = await get_page_views({
    satellite_id: [],
    from,
    to,
  });

  const outputFile = join(OUTPUT_DIR, `analytics-${fromText}-${toText}.json`);

  await writeFile(outputFile, JSON.stringify(pageViews, jsonReplacer, 2));

  return { length: pageViews.length };
};

const OUTPUT_DIR = join(process.cwd(), "output");

try {
  const periods = buildPeriods(args);

  await mkdir(OUTPUT_DIR, { recursive: true });

  let total = 0;

  for (const period of periods) {
    const { length } = await collectPageViews(period);
    total += length;
  }

  console.log(`Analytics collected. ${total} page view's entries found.`);
} catch (err) {
  console.error(err);
}
