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
const bn_id = process.argv
  .find((arg) => arg.indexOf(`--bnid`) > -1)
  ?.replace(`--bnid=`, "");

assertNonNullish(domain, "Domain undefined.");
assertNonNullish(bn_id, "BN ID undefined.");

console.log(
  `About to update ${domain} with BN ID ${bn_id} in Satellite ${satelliteId}.`,
);

try {
  const domains = await listCustomDomains({
    satellite,
  });

  const customDomain = domains.find(({ domain: d }) => d === domain);

  assertNonNullish(
    customDomain,
    "Custom domain does not exist in the Satellite.",
  );

  await setCustomDomains({
    satellite,
    domains: [
      {
        ...customDomain,
        bn_id,
      },
    ],
  });

  console.log("Done.");
} catch (err) {
  console.error(err);
}
