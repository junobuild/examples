import { setSatellitesController } from "@junobuild/admin";
import { defineRun } from "@junobuild/config";

export const onRun = defineRun(() => ({
  run: async ({ identity, satelliteId, container }) => {
    const controllerId = process.argv
      .find((arg) => arg.indexOf(`--controllerId`) > -1)
      ?.replace(`--controllerId=`, "");
    const profile = process.argv
      .find((arg) => arg.indexOf(`--profile`) > -1)
      ?.replace(`--profile=`, "");

    const missionControl = {
      identity,
      missionControlId: process.env.JUNO_MISSION_CONTROL_ID,
    };

    console.log(
      `About to set ${controllerId} in satellite ${satelliteId} with the help of the mission control ${missionControl.missionControlId}.`,
    );

    await setSatellitesController({
      missionControl,
      satelliteIds: [satelliteId],
      controllerId,
      profile,
    });

    console.log("Done.");
  },
}));
