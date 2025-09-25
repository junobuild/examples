import { defineConfig } from "@junobuild/config";

/** @type {import('@junobuild/config').JunoConfig} */
export default defineConfig({
  satellite: {
    ids: {
      development: "bxmfs-ip777-77775-aaagq-cai",
      production: "<PROD_SATELLITE_ID>",
    },
    source: "build",
    predeploy: ["npm run build"],
  },
});
