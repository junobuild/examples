import { hasArgs, nextArg } from "@junobuild/cli-tools";
import { assertNonNullish, notEmptyString, toNullable } from "@dfinity/utils";
import { eachHourOfInterval } from "date-fns";

/**
 * Convert a Date to nanoseconds
 * @type {Date}
 */
export const toBigIntNanoSeconds = (date) =>
  BigInt(date.getTime()) * BigInt(1e6);

/**
 * Build the from and to dates provided as arguments.
 */
export const buildInterval = (args) => {
  const hasFrom = hasArgs({ args, options: ["-f", "--from"] });
  const hasTo = hasArgs({ args, options: ["-t", "--to"] });

  const from = hasFrom
    ? (nextArg({ args, option: "-f" }) ?? nextArg({ args, option: "--from" }))
    : undefined;

  const to = hasTo
    ? (nextArg({ args, option: "-t" }) ?? nextArg({ args, option: "--to" }))
    : undefined;

  return {
    from: notEmptyString(from) ? new Date(from) : undefined,
    to: notEmptyString(to) ? new Date(to) : undefined,
  };
};

export const buildPeriods = (args) => {
  const { from, to } = buildInterval(args);

  assertNonNullish(from);
  assertNonNullish(to);

  const hours = eachHourOfInterval({
    start: from,
    end: to,
  });

  assertNonNullish(hours);

  const periods = [];
  for (let i = 0; i <= hours.length - 2; i++) {
    periods.push({
      from: toNullable(toBigIntNanoSeconds(hours[i])),
      to: toNullable(toBigIntNanoSeconds(hours[i + 1])),
    });
  }

  if (periods.length === 0) {
    throw new Error("It’s not possible to split the period into hours.");
  }

  return periods;
};
