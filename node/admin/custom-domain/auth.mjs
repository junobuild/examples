import { Ed25519KeyIdentity } from "@dfinity/identity/lib/cjs/identity/ed25519.js";
import Conf from "conf";
import prompts from "prompts";
import { assertAnswerCtrlC } from "@junobuild/cli-tools";

import * as dotenv from "dotenv";
dotenv.config();

const getToken = async () => {
  const config = await readConfig();

  const use = config.get("use");

  const isDefaultProfile = (use) =>
    use === null || use === undefined || use === "default";

  if (!isDefaultProfile(use)) {
    return config.get("profiles")?.[use]?.token;
  }

  return config.get("token");
};

const readConfig = async () => {
  // For simplicity reason. We first try to read the config as if it was not encoded and then we fallback to a solution with key.
  try {
    return new Conf({ projectName: "juno" });
  } catch (_) {
    const encryptionKey = await askForPassword();
    return new Conf({ projectName: "juno", encryptionKey });
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
