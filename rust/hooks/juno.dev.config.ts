import { defineDevConfig } from "@junobuild/config";

export default defineDevConfig({
  satellite: {
    collections: {
      db: [
        {
          collection: "demo",
          read: "managed",
          write: "managed",
          memory: "Heap",
          mutablePermissions: true,
        },
        {
          collection: "demo_2",
          read: "managed",
          write: "managed",
          memory: "Heap",
          mutablePermissions: true,
        },
      ],
      storage: [
        {
          collection: "images",
          read: "managed",
          write: "managed",
          memory: "Heap",
          mutablePermissions: true,
        },
      ],
    },
  },
});
