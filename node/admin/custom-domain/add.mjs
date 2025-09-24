import { setCustomDomain } from "@junobuild/admin";
import { defineRun } from "@junobuild/config";
import { assertNonNullish } from "@dfinity/utils";

export const onRun = defineRun(() => ({
  run: async (context) => {
    const domain = process.argv
      .find((arg) => arg.indexOf(`--domain`) > -1)
      ?.replace(`--domain=`, "");

    assertNonNullish(domain, "Domain undefined.");

    console.log(
      `About to add ${domain} - without BN ID - to Satellite ${context.satelliteId}.`,
    );

    await setCustomDomain({
      satellite: context,
      domain: {
        domain,
      },
    });

    console.log("Done.");
  },
}));
