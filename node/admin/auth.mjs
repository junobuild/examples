import { Ed25519KeyIdentity } from "@dfinity/identity/lib/cjs/identity/ed25519.js";
import Conf from "conf";

import * as dotenv from "dotenv";
dotenv.config();

const projectName = process.env.JUNO_CLI_AUTH_PROJECT_NAME;
const config = new Conf({ projectName });

const getToken = () => {
  const use = config.get("use");

  const isDefaultProfile = (use) =>
    use === null || use === undefined || use === "default";

  if (!isDefaultProfile(use)) {
    return config.get("profiles")?.[use]?.token;
  }

  return config.get("token");
};

export const getIdentity = () => {
  const token = getToken();
  return Ed25519KeyIdentity.fromParsedJson(token);
};
