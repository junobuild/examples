import pkgAgent from "@dfinity/agent";
import { idlFactory as orbiterIdlFactory } from "./node_modules/@junobuild/ic-client/declarations/orbiter/orbiter.factory.did.mjs";

const { HttpAgent, Actor } = pkgAgent;

export const orbiterLocalActor = async ({ orbiterId, identity }) => {
  const agent = await HttpAgent.create({
    identity,
    host: "http://127.0.0.1:5987/",
    shouldFetchRootKey: true,
  });

  return Actor.createActor(orbiterIdlFactory, {
    agent,
    canisterId: orbiterId,
  });
};
