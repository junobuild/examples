import { nodePolyfills } from "vite-plugin-node-polyfills";
import juno from "@junobuild/vite-plugin";

export default () => ({
  plugins: [nodePolyfills(), juno()],
  server: {
    port: 5174,
  },
});
