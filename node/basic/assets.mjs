import { getAsset, listAssets, uploadBlob } from "@junobuild/core";
import { readFile } from "node:fs/promises";
import { defineRun } from "@junobuild/config";

export const onRun = defineRun(() => ({
  run: async (context) => {
    const data = new Blob([await readFile("./README.md")], {});

    const collection = "files";

    const filename = "README.md";
    const fullPath = `/files/${filename}`;

    const upload = async () => {
      const result = await uploadBlob({
        collection,
        fullPath,
        filename,
        data,
        satellite: context,
      });

      console.log("Upload", result);
    };

    const get = async () =>
      console.log(
        "Get",
        await getAsset({
          satellite: context,
          collection,
          fullPath,
        }),
      );

    const list = async () =>
      console.log(
        "List",
        await listAssets({
          collection,
          filter: {},
          satellite: context,
        }),
      );

    console.log("This is a demo for handling assets in NodeJS");

    await upload();
    await get();
    await list();
  },
}));
