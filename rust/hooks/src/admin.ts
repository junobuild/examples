import { satelliteVersion } from "@junobuild/admin";
import { unsafeIdentity } from "@junobuild/core";
import { CanisterStatus, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

export const version = async () => {
  const v = await satelliteVersion({
    satellite: {
      satelliteId: import.meta.env.VITE_SATELLITE_ID,
      identity: await unsafeIdentity(),
      container: import.meta.env.VITE_CONTAINER,
    },
  });
  console.log("Version:", v);

  const agent = new HttpAgent({
    host: import.meta.env.VITE_CONTAINER,
  });

  await agent.fetchRootKey();

  const request = await CanisterStatus.request({
    canisterId: Principal.from(import.meta.env.VITE_SATELLITE_ID),
    agent,
    paths: [
      {
        kind: "metadata",
        key: "juno:build",
        path: "juno:build",
        decodeStrategy: "utf-8",
      },
    ],
  });

  console.log("Satellite build type", request);
};
