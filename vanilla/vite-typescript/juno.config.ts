import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: '<DEV_SATELLITE_ID>',
      production: '<PROD_SATELLITE_ID>'
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
    id: '<DEV_ORBITER_ID>',
  }
});
