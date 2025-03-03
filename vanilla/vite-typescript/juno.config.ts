import { defineConfig } from "@junobuild/config";

export default defineConfig({
  satellite: {
    id: "xo2hm-lqaaa-aaaal-ab3oa-cai",
    source: "dist",
    predeploy: ["npm run build"],
    storage: {
      headers: [
        {
          source: "**/*.png",
          headers: [
            ["Cache-Control", "max-age=9988776655"],
            ["Access-Control-Allow-Origin", "*"],
          ],
        },
      ],
    },
  },
});
