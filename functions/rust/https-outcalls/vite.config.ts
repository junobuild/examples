import juno from "@junobuild/vite-plugin";

export default () => {
  return {
    plugins: [juno()],
  };
};
