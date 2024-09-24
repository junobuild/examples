#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { setCustomDomains, listCustomDomains } from "@junobuild/admin";
import fetch from "node-fetch";
import { assertNonNullish } from "@junobuild/utils";

const identity = getIdentity();

const satelliteId = process.env.JUNO_SATELLITE_ID;

assertNonNullish(satelliteId, "Satellite ID undefined.");

const satellite = {
  identity,
  satelliteId,
  fetch,
};

const domain = process.argv
  .find((arg) => arg.indexOf(`--domain`) > -1)
  ?.replace(`--domain=`, "");

assertNonNullish(bn_id, "BN ID undefined.");

console.log(
  `About to add ${domain} - without BN ID - to Satellite ${satelliteId}.`,
);

try {
  const domains = await listCustomDomains({
    satellite,
  });

  const toBigIntNanoSeconds = (date) => BigInt(date.getTime()) * BigInt(1e6);
  const now = toBigIntNanoSeconds(new Date());

  await setCustomDomains({
    satellite,
    domains: [
      ...(domains ?? []).filter(({ domain: d }) => d !== domain),
      {
        domain,
        created_at: now,
        updated_at: now,
      },
    ],
  });

  console.log("Done.");
} catch (err) {
  console.error(err);
}
