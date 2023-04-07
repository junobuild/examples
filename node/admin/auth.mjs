import { Ed25519KeyIdentity } from "@dfinity/identity/lib/cjs/identity/ed25519.js";
import Conf from "conf";

const config = new Conf({ projectName: "juno" });

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
