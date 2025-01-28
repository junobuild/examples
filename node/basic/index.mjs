#!/usr/bin/env node

import { getDoc, setDoc } from "@junobuild/core";
import { AnonymousIdentity } from "@dfinity/agent";
import { nanoid } from "nanoid";

const satellite = {
  identity: new AnonymousIdentity(),
  satelliteId: "jx5yt-yyaaa-aaaal-abzbq-cai",
  container: true,
};

const id = nanoid();

const set = async () =>
  setDoc({
    collection: "demo",
    doc: {
      key: id,
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
      collection: "demo",
      key: id,
      satellite,
    }),
  );

console.log("This is a demo client in NodeJS");

await set();
await get();
