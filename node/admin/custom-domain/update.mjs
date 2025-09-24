import { setCustomDomains, listCustomDomains } from "@junobuild/admin";
import { assertNonNullish } from "@dfinity/utils";
import { defineRun } from "@junobuild/config";

export const onRun = defineRun(() => ({
  run: async (context) => {
    const domain = process.argv
      .find((arg) => arg.indexOf(`--domain`) > -1)
      ?.replace(`--domain=`, "");
    const bn_id = process.argv
      .find((arg) => arg.indexOf(`--bnid`) > -1)
      ?.replace(`--bnid=`, "");

    assertNonNullish(domain, "Domain undefined.");
    assertNonNullish(bn_id, "BN ID undefined.");

    console.log(
      `About to update ${domain} with BN ID ${bn_id} in Satellite ${context.satelliteId}.`,
    );

    const domains = await listCustomDomains({
      satellite: context,
    });

    const customDomain = domains.find(({ domain: d }) => d === domain);

    assertNonNullish(
      customDomain,
      "Custom domain does not exist in the Satellite.",
    );

    await setCustomDomains({
      satellite: context,
      domains: [
        {
          ...customDomain,
          bn_id,
        },
      ],
    });

    console.log("Done.");
  },
}));
