#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { assertNonNullish } from "@dfinity/utils";
import { orbiterActor } from "./actor.mjs";
import { buildPeriods } from "./utils.mjs";

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

const collectPageViews = async ({ from, to }) => {
  const pageViews = await get_page_views({
    satellite_id: [],
    from,
    to,
  });

  console.log(pageViews);
};

try {
  const periods = buildPeriods(args);

  for (const period of periods) {
    await collectPageViews(period);
  }

  console.log("Analytics saved.");
} catch (err) {
  console.error(err);
}
