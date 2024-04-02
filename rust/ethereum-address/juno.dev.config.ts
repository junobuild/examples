import {defineDevConfig} from '@junobuild/config';

export default defineDevConfig(() => ({
  satellite: {
    collections: {
      db: [{
        collection: "profiles",
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
