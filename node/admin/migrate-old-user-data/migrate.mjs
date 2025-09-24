import { listDocs, setManyDocs } from "@junobuild/core";
import { defineRun } from "@junobuild/config";

export const onRun = defineRun(() => ({
  run: async (context) => {
    const list = process.argv.find((arg) => arg.indexOf(`--list`) > -1);

    const { satelliteId } = context;

    console.log(
      `About to ${list ? "list" : "migrate"} users of Satellite ${satelliteId}.`,
    );

    const { items: users } = await listDocs({
      collection: "#user",
      satellite: context,
    });

    const oldUsers = users.filter((user) => !("provider" in user.data));

    console.log("Old users found:", oldUsers.length);

    if (list) {
      return;
    }

    if (oldUsers.length === 0) {
      console.log("No old beta users to migrate.");
      return;
    }

    const upgradeUsers = oldUsers.map((user) => ({
      collection: "#user",
      doc: {
        ...user,
        data: {
          provider: "internet_identity",
        },
      },
    }));

    await setManyDocs({
      docs: upgradeUsers,
      satellite: context,
    });

    console.log("Old users migrated.");
  },
}));
