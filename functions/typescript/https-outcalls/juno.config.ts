import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "<DEV_SATELLITE_ID>",
      production: "<PROD_SATELLITE_ID>",
    },
    source: "dist",
    predeploy: ["npm run build"],
    collections: {
      datastore: [
        {
          collection: "dogs",
          read: "managed",
          write: "managed",
          memory: "heap",
          mutablePermissions: true,
        },
      ],
    },
  },
});
