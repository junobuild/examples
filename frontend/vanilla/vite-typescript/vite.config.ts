import juno from "@junobuild/vite-plugin";

export default () => ({
  plugins: [juno()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        {
          name: "fix-node-globals-polyfill",
          setup(build) {
            build.onResolve(
              { filter: /_virtual-process-polyfill_\.js/ },
              ({ path }) => ({ path }),
            );
          },
        },
      ],
    },
  },
  server: {
    port: 5174,
  },
});
