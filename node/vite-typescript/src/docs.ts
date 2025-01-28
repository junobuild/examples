import { getDoc, setDoc } from "@junobuild/core";
import { AnonymousIdentity } from "@dfinity/agent";
import { nanoid } from "nanoid";
import type { SatelliteOptions } from "@junobuild/core";

const satellite: SatelliteOptions = {
  identity: new AnonymousIdentity(),
  satelliteId: "jx5yt-yyaaa-aaaal-abzbq-cai",
  container: true,
};

const key = nanoid();

const collection = "demo" as const;

interface MyData {
  hello: string;
}

const set = async () =>
  setDoc<MyData>({
    collection,
    doc: {
      key,
      data: {
        hello: "world",
      },
    },
    satellite,
  });

const get = async () =>
  console.log(
    "Get",
    await getDoc({
      collection,
      key,
      satellite,
    }),
  );

console.log("This is a demo client in NodeJS with TypeScript");

await set();
await get();
