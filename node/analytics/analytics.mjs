#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { listDocs, setManyDocs } from "@junobuild/core";
import { assertNonNullish } from "@dfinity/utils";

const identity = await getIdentity();

const orbiterId = process.env.ORBITER_ID;

assertNonNullish(orbiterid, "Satellite ID undefined.");

const orbiter = {
  identity,
  orbiterId,
};

try {
  const { items: users } = await listDocs({
    collection: "#user",
    satellite,
  });

  console.log("Analytics saved.");
} catch (err) {
  console.error(err);
}
