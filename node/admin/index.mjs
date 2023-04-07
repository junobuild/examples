#!/usr/bin/env node

import * as dotenv from "dotenv";
dotenv.config();

console.log(process.env)

import { getDoc, setDoc } from "@junobuild/core";
import fetch from "node-fetch";
import { getIdentity } from "./auth.mjs";
import { readFile } from "fs/promises";

console.log("HERE", process.env.JUNO_CLI_AUTH_PROJECT_NAME);

const identity = getIdentity();

const readData = async () => {
  const buffer = await readFile(process.env.DATA_SRC);
  return JSON.parse(buffer.toString("utf-8"));
};

const satellite = {
  identity,
  satelliteId: process.env.JUNO_SATELLITE_ID,
  fetch,
};

const collection = process.env.JUNO_DATASTORE_COLLECTION;
const keyField = process.env.DATA_KEY_FIELD;

const get = async (key) =>
  getDoc({
    collection,
    key,
    satellite,
  });

const set = async (entry) => {
  const key = entry[keyField];

  const existingEntry = await get(key);

  await setDoc({
    collection,
    satellite,
    doc: {
      ...(existingEntry !== undefined && existingEntry),
      key,
      data: entry,
    },
  });

  console.log(`Key ${key} set.`);
};

const loadData = async () => {
  const data = await readData();

  const promises = data.map((entry) => set(entry));
  await Promise.all(promises);
};

console.log("Start.");

await loadData();

console.log("Done.");
