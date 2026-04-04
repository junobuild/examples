import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    ids: {
      development: "auamu-4x777-77775-aaaaa-cai",
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
