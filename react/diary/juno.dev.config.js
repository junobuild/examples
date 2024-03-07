export default {
  satellite: {
    collections: {
      db: [
        {
          collection: "notes",
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
          memory: "Stable",
          mutablePermissions: true,
        },
      ],
    },
    controllers: [],
  },
};
