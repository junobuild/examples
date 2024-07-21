import { defineDevConfig } from "@junobuild/config";

/** @type {import('@junobuild/config').JunoDevConfig} */
export default defineDevConfig(() => ({
  satellite: {
    collections: {
      db: [
        {
          collection: "demo",
          read: "public",
          write: "public",
          memory: "stable",
          mutablePermissions: true,
        },
      ],
      storage: [
        {
          collection: "files",
          read: "public",
          write: "public",
          memory: "stable",
          mutablePermissions: true,
        },
      ],
    },
    controllers: [],
  },
}));
