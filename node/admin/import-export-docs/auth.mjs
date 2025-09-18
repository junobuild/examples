import { Ed25519KeyIdentity } from "@dfinity/identity";
import Conf from "conf";
import prompts from "prompts";
import { assertAnswerCtrlC } from "@junobuild/cli-tools";
import * as dotenv from "dotenv";
import { nextArg } from "@junobuild/cli-tools";
import { notEmptyString } from "@dfinity/utils";

dotenv.config();

const getToken = async () => {
  const config = await readConfig();
  return config.get("token");
};

const initProjectName = () => {
  const [_, ...args] = process.argv.slice(1);

  const mode =
    nextArg({ args, option: "-m" }) ?? nextArg({ args, option: "--mode" });
  const profile =
    nextArg({ args, option: "-p" }) ?? nextArg({ args, option: "--profile" });

  const modeSuffix =
    notEmptyString(mode) && (mode !== "production" || notEmptyString(profile))
      ? `-${mode}`
      : "";

  const profileSuffix = notEmptyString(profile) ? `-${profile}` : "";

  const projectName = `juno${profileSuffix}${modeSuffix}`;

  return projectName;
};

const projectName = initProjectName();

const readConfig = async () => {
  // For simplicity reason. We first try to read the config as if it was not encoded and then we fallback to a solution with key.
  try {
    return new Conf({ projectName });
  } catch (_) {
    const encryptionKey = await askForPassword();
    return new Conf({ projectName, encryptionKey });
  }
};

const askForPassword = async (
  message = "Please provide the password for your CLI configuration.",
) => {
  const { encryptionKey } = await prompts([
    {
      type: "password",
      name: "encryptionKey",
      message,
    },
  ]);

  assertAnswerCtrlC(encryptionKey);

  return encryptionKey;
};

export const getIdentity = async () => {
  const token = await getToken();
  return Ed25519KeyIdentity.fromParsedJson(token);
};
