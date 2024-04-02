import {defineDevConfig} from '@junobuild/config';

export default defineDevConfig(() => ({
  satellite: {
    collections: {
      db: [{
        collection: "users",
        mutablePermissions: false,
        read: "managed" as const,
        write: "managed" as const,
        memory: "stable" as const
      }],
      storage: []
    },
    controllers: []
  }
}));
