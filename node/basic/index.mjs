import { getDoc, setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";
import { defineRun } from "@junobuild/config";

export const onRun = defineRun(() => ({
  run: async (context) => {
    const id = nanoid();

    const set = async () =>
      setDoc({
        collection: "demo",
        doc: {
          key: id,
          data: {
            hello: "world",
          },
        },
        satellite: context,
      });

    const get = async () =>
      console.log(
        "Get",
        await getDoc({
          collection: "demo",
          key: id,
          satellite: context,
        }),
      );

    console.log("This is a demo client in NodeJS");

    await set();
    await get();
  },
}));
