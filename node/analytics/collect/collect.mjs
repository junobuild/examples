#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { assertNonNullish, jsonReplacer } from "@dfinity/utils";
import { orbiterActor } from "./actor.mjs";
import { buildPeriods } from "./utils.mjs";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { hasArgs } from "@junobuild/cli-tools";

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

const { get_page_views, get_track_events, get_performance_metrics } =
  await orbiterActor({
    orbiterId,
    identity,
  });

const args = process.argv.slice(2);

const trackEvents = hasArgs({ args, options: ["-t", "--track-events"] });
const performanceMetrics = hasArgs({
  args,
  options: ["-p", "--performance-metrics"],
});

const collectAnalytics = async ({ from, to, fromText, toText }) => {
  const fn = trackEvents
    ? get_track_events
    : performanceMetrics
      ? get_performance_metrics
      : get_page_views;

  const data = await fn({
    satellite_id: [],
    from,
    to,
  });

  const outputFile = join(OUTPUT_DIR, `analytics-${fromText}-${toText}.json`);

  await writeFile(outputFile, JSON.stringify(data, jsonReplacer, 2));

  return { length: data.length };
};

const OUTPUT_DIR = join(
  process.cwd(),
  "output",
  trackEvents
    ? "track-events"
    : performanceMetrics
      ? "performance-metrics"
      : "page-views",
);

try {
  const periods = buildPeriods(args);

  await mkdir(OUTPUT_DIR, { recursive: true });

  let total = 0;

  for (const period of periods) {
    const { length } = await collectAnalytics(period);
    total += length;
  }

  console.log(`Analytics collected. ${total} entries found.`);
} catch (err) {
  console.error(err);
}
