import viteCompression from 'vite-plugin-compression';
import Juno from "@junobuild/vite-plugin";
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default () => {
    return {
        plugins: [viteCompression(), Juno({
            container: true
        })],
        define: {
            global: {},
        },
        build: {
            commonjsOptions: { include: [] },
        },
        optimizeDeps: {
            disabled: false,
            esbuildOptions: {
                define: {
                    global: 'globalThis'
                },
                plugins: [
                    NodeModulesPolyfillPlugin()
                ]
            }
        },
    };
};