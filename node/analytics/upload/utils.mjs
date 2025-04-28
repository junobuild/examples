import { hasArgs, nextArg } from "@junobuild/cli-tools";
import {
  assertNonNullish,
  fromNullable,
  isEmptyString,
  jsonReviver,
} from "@dfinity/utils";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export const readData = async (file) => {
  const content = await readFile(file, "utf-8");

  const data = fromNullable(JSON.parse(content, jsonReviver));

  assertNonNullish(data);

  if (data.length === 0) {
    throw new Error(`${file} does not contain data.`);
  }

  return data;
};

/**
 * List the files to process for upload.
 */
export const listFiles = async (args) => {
  const hasPath = hasArgs({ args, options: ["-p", "--path"] });

  const path = hasPath
    ? (nextArg({ args, option: "-p" }) ?? nextArg({ args, option: "--path" }))
    : undefined;

  assertNonNullish(path);

  if (isEmptyString(path)) {
    throw new Error("Path must be provided.");
  }

  const files = await readdir(path);

  return files.map((file) => join(path, file));
};
