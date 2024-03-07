import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import juno from "@junobuild/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), juno()],
});
