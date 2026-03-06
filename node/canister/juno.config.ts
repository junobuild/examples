import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "a2cb4-hh777-77775-aaaba-cai",
      production: "<PROD_SATELLITE_ID>",
    },
    source: "build",
    predeploy: ["npm run build"],
  },
});
