#!/usr/bin/env node

import {
  assertNonNullish,
  fromNullable,
  isNullish,
  jsonReplacer,
  nonNullish,
  toNullable,
} from "@dfinity/utils";
import { listFiles, readData } from "./utils.mjs";
import { Principal } from "@dfinity/principal";
import * as dotenv from "dotenv";
import { hasArgs } from "@junobuild/cli-tools";
import UAParser from "ua-parser-js";
import { orbiterLocalActor } from "./actor.mjs";
import { getIdentity } from "./auth.mjs";

dotenv.config();

const identity = await getIdentity();

console.log("");
// prettier-ignore
console.log(" █████╗ ███╗   ██╗ █████╗ ██╗  ██╗   ██╗████████╗██╗ ██████╗███████╗");
// prettier-ignore
console.log("██╔══██╗████╗  ██║██╔══██╗██║  ╚██╗ ██╔╝╚══██╔══╝██║██╔════╝██╔════╝");
// prettier-ignore
console.log("███████║██╔██╗ ██║███████║██║   ╚████╔╝    ██║   ██║██║     ███████╗");
// prettier-ignore
console.log("██╔══██║██║╚██╗██║██╔══██║██║    ╚██╔╝     ██║   ██║██║     ╚════██║");
// prettier-ignore
console.log("██║  ██║██║ ╚████║██║  ██║███████╗██║      ██║   ██║╚██████╗███████║");
// prettier-ignore
console.log("╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝      ╚═╝   ╚═╝ ╚═════╝╚══════╝");

console.log(`\n[Your CLI identity: ${identity.getPrincipal().toText()}]\n`);

const orbiterId = process.env.ORBITER_ID;
const satelliteId = process.env.SATELLITE_ID;

assertNonNullish(orbiterId, "Orbiter ID undefined.");

const { set_page_views, set_track_events, set_performance_metrics } =
  await orbiterLocalActor({ orbiterId, identity });

const args = process.argv.slice(2);

const trackEvents = hasArgs({ args, options: ["-t", "--track-events"] });
const performanceMetrics = hasArgs({
  args,
  options: ["-p", "--performance-metrics"],
});

const groupSize = 1000;

const batchUploadPageViews = async (data) => {
  let batches = [];

  for (let start = 0; start < data.length; start += groupSize) {
    const batch = data.slice(start, start + groupSize);
    batches.push(batch);
  }

  for await (const result of batchUpload({ batches })) {
  }

  return { length: data.length };
};

async function* batchUpload({ batches, limit = 12 }) {
  for (let i = 0; i < batches.length; i = i + limit) {
    const batch = batches.slice(i, i + limit);
    const result = await Promise.all(batch.map((data) => uploadData(data)));
    yield result;
  }
}

const uploadData = async (data) => {
  if (trackEvents) {
    await uploadTrackEvents(data);
    return;
  }

  if (performanceMetrics) {
    await uploadPerformanceMetrics(data);
    return;
  }

  await uploadPageViews(data);
};

const uploadPerformanceMetrics = async (data) => {
  const setTrackEventsData = data.map(
    ([
      key,
      { version: ___, created_at: _, updated_at: __, satellite_id, ...value },
    ]) => {
      return [
        key,
        {
          ...value,
          updated_at: [],
          version: [],
          user_agent: [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
          ],
          satellite_id: nonNullish(satelliteId)
            ? Principal.fromText(satelliteId)
            : satellite_id,
        },
      ];
    },
  );

  const result = await set_performance_metrics(setTrackEventsData);

  if ("Err" in result) {
    console.log(
      "Error uploading performance metrics:",
      JSON.stringify(result, jsonReplacer),
    );
    return;
  }

  console.log("Upload performance metrics success:", result);
};

const uploadTrackEvents = async (data) => {
  const setTrackEventsData = data.map(
    ([
      key,
      { version: ___, created_at: _, updated_at: __, satellite_id, ...value },
    ]) => {
      return [
        key,
        {
          ...value,
          updated_at: [],
          version: [],
          user_agent: [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
          ],
          satellite_id: nonNullish(satelliteId)
            ? Principal.fromText(satelliteId)
            : satellite_id,
        },
      ];
    },
  );

  const result = await set_track_events(setTrackEventsData);

  if ("Err" in result) {
    console.log(
      "Error uploading track events:",
      JSON.stringify(result, jsonReplacer),
    );
    return;
  }

  console.log("Upload track events success:", result);
};

const uploadPageViews = async (data) => {
  const setPageViewsData = data.map(
    ([
      key,
      {
        version: ___,
        created_at: _,
        updated_at: __,
        satellite_id,
        user_agent,
        device,
        ...value
      },
    ]) => {
      const userAgent = fromNullable(user_agent);

      const parser = new UAParser(userAgent);
      const { browser, os, device: uaDevice } = parser.getResult();

      const client =
        isNullish(browser.name) || isNullish(os.name)
          ? undefined
          : {
              browser: browser.name,
              os: os.name,
              device: toNullable(uaDevice.type),
            };

      return [
        key,
        {
          ...value,
          client: toNullable(client),
          device: {
            ...device,
            screen_height: [],
            screen_width: [],
          },
          updated_at: [],
          version: [],
          user_agent,
          satellite_id: nonNullish(satelliteId)
            ? Principal.fromText(satelliteId)
            : satellite_id,
        },
      ];
    },
  );

  const result = await set_page_views(setPageViewsData);

  if ("Err" in result) {
    console.log(
      "Error uploading page views:",
      JSON.stringify(result, jsonReplacer),
    );
    return;
  }

  console.log("Upload page views success:", result);
};

try {
  const files = await listFiles(args);

  let total = 0;

  for (const file of files) {
    const data = await readData(file);
    const { length } = await batchUploadPageViews(data);
    total += length;
  }

  console.log(`Analytics collected. ${total} page view's entries uploaded.`);
} catch (err) {
  console.error(err);
}
