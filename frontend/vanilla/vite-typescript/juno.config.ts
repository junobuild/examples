import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
      production: "<PROD_SATELLITE_ID>",
    },
    source: "dist",
    predeploy: ["npm run build"],
    storage: {
      headers: [
        {
          source: "**/*.png",
          headers: [
            ["Cache-Control", "max-age=9988776655"],
            ["Access-Control-Allow-Origin", "*"],
          ],
        },
      ],
    },
  },
  orbiter: {
    ids: {
      development: "<DEV_ORBITER_ID>",
      production: "<PROD_ORBITER_ID>",
    },
  },
});
