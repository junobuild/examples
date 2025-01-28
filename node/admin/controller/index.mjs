#!/usr/bin/env node

import { getIdentity } from "./auth.mjs";
import { setSatellitesController } from "@junobuild/admin";
import { Principal } from "@dfinity/principal";

const identity = getIdentity();

const missionControl = {
  identity,
  missionControlId: process.env.JUNO_MISSION_CONTROL_ID,
};

const satelliteId = process.env.JUNO_SATELLITE_ID;

const controllerId = process.argv
  .find((arg) => arg.indexOf(`--controllerId`) > -1)
  ?.replace(`--controllerId=`, "");
const profile = process.argv
  .find((arg) => arg.indexOf(`--profile`) > -1)
  ?.replace(`--profile=`, "");

console.log(
  `About to set ${controllerId} in satellite ${satelliteId} with the help of the mission control ${missionControl.missionControlId}.`,
);

try {
  await setSatellitesController({
    missionControl,
    satelliteIds: [Principal.fromText(satelliteId)],
    controllerId,
    profile,
  });

  console.log("Done.");
} catch (err) {
  console.error(err);
}
