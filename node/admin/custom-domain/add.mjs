#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { setCustomDomain } from "@junobuild/admin";
import { assertNonNullish } from "@dfinity/utils";

const identity = await getIdentity();

const satelliteId = process.env.JUNO_SATELLITE_ID;

assertNonNullish(satelliteId, "Satellite ID undefined.");

const satellite = {
  identity,
  satelliteId,
};

const domain = process.argv
  .find((arg) => arg.indexOf(`--domain`) > -1)
  ?.replace(`--domain=`, "");

assertNonNullish(domain, "Domain undefined.");

console.log(
  `About to add ${domain} - without BN ID - to Satellite ${satelliteId}.`,
);

try {
  await setCustomDomain({
    satellite,
    domain: {
      domain,
    },
  });

  console.log("Done.");
} catch (err) {
  console.error(err);
}
