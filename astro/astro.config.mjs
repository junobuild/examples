import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://nkzsw-gyaaa-aaaal-ada3a-cai.icp0.io",
  integrations: [mdx(), sitemap()],
});
