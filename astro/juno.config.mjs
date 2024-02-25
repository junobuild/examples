import { defineConfig } from "@junobuild/config";

/** @type {import('@junobuild/config').JunoConfig} */
export default defineConfig({
  satellite: {
    satellitesIds: {
      production: "nkzsw-gyaaa-aaaal-ada3a-cai",
      development: "aovwi-4maaa-aaaaa-qaagq-cai",
    },
    source: "dist",
    storage: {
      headers: [
        {
          source: "**/*.jpg",
          headers: [
            ["Cache-Control", "max-age=31536000"],
            ["Access-Control-Allow-Origin", "*"],
          ],
        },
      ],
      redirects: [
        {
          source: "/blog/redirect",
          location: "/blog/first-post/index.html",
          code: 301,
        },
      ],
      rewrites: [
        {
          source: "/blog/**",
          destination: "/blog/first-post/index.html",
        },
      ],
    },
  },
});
