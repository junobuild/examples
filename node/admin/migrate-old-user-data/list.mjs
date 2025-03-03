#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { listDocs } from "@junobuild/core";
import { assertNonNullish } from "@dfinity/utils";

const identity = await getIdentity();

const satelliteId = process.env.JUNO_SATELLITE_ID;

assertNonNullish(satelliteId, "Satellite ID undefined.");

const satellite = {
  identity,
  satelliteId,
};

console.log(
  `About to list users of Satellite ${satelliteId}.`,
);

try {
  const users = await listDocs({
    collection: "#user",
    satellite,
  });

  console.log(users);

  console.log("Done.");
} catch (err) {
  console.error(err);
}
