#!/usr/bin/env node

import { getAsset, listAssets, uploadBlob } from "@junobuild/core";
import { AnonymousIdentity } from "@dfinity/agent";
import { readFile } from "node:fs/promises";

const satellite = {
  identity: new AnonymousIdentity(),
  satelliteId: "jx5yt-yyaaa-aaaal-abzbq-cai",
  container: true,
};

const data = new Blob([await readFile("./docker-compose.yml")]);

const collection = "files";

const filename = "docker-compose.yml";
const fullPath = `/files/${filename}`;

const upload = async () => {
  const result = await uploadBlob({
    collection,
    fullPath,
    filename,
    data,
    satellite,
  });
  console.log("Upload", result);
};

const get = async () =>
  console.log(
    "Get",
    await getAsset({
      satellite,
      collection,
      fullPath,
    }),
  );

const list = async () =>
  console.log(
    "List",
    await listAssets({
      collection,
      filter: {},
      satellite,
    }),
  );

console.log("This is a demo for handling assets in NodeJS");

await upload();
await get();
await list();
