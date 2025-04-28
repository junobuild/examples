import pkgAgent from "@dfinity/agent";
import { idlFactory as orbiterIdlFactory } from "./node_modules/@junobuild/admin/dist/declarations/orbiter/orbiter.factory.did.mjs";

const { HttpAgent, Actor } = pkgAgent;

export const orbiterActor = async ({ orbiterId, identity }) => {
  const agent = await HttpAgent.create({
    identity,
    host: "https://icp-api.io",
  });

  return Actor.createActor(orbiterIdlFactory, {
    agent,
    canisterId: orbiterId,
  });
};
