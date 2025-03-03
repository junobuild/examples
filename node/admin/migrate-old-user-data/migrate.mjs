#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { listDocs, setManyDocs } from "@junobuild/core";
import { assertNonNullish } from "@dfinity/utils";

const identity = await getIdentity();

const satelliteId = process.env.JUNO_SATELLITE_ID;

assertNonNullish(satelliteId, "Satellite ID undefined.");

const satellite = {
  identity,
  satelliteId,
};

const list = process.argv.find((arg) => arg.indexOf(`--list`) > -1);

console.log(
  `About to ${list ? "list" : "migrate"} users of Satellite ${satelliteId}.`,
);

try {
  const { items: users } = await listDocs({
    collection: "#user",
    satellite,
  });

  const oldUsers = users.filter((user) => !("provider" in user.data));

  console.log("Old users found:", oldUsers.length);

  if (list) {
    process.exit(0);
  }

  if (oldUsers.length === 0) {
    console.log("No old beta users to migrate.");
    process.exit(0);
  }

  const upgradeUsers = oldUsers.map((user) => ({
    collection: "#user",
    doc: {
      ...user,
      data: {
        provider: "internet_identity",
      },
    },
  }));

  await setManyDocs({
    docs: upgradeUsers,
    satellite,
  });

  console.log("Old users migrated.");
} catch (err) {
  console.error(err);
}
