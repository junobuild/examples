import { defineConfig } from "@junobuild/config";

/** @type {import('@junobuild/config').JunoConfig} */
export default defineConfig({
  satellite: {
    ids: {
      production: "nkzsw-gyaaa-aaaal-ada3a-cai",
      development: "aovwi-4maaa-aaaaa-qaagq-cai",
    },
    source: "dist",
    predeploy: ["npm run build"],
  },
  orbiter: {
    ids: {
      production: "ot5tb-nqaaa-aaaal-ac2sa-cai",
      development: "<DEVELOPMENT_ID>",
    },
  },
});
