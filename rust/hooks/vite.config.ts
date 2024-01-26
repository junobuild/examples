import viteCompression from 'vite-plugin-compression';
import Juno from "@junobuild/vite-plugin";

export default () => {
    return {
        plugins: [viteCompression(), Juno({
            container: true
        })],
        server: {
            port: 5175
        },
        define: {
            global: {},
        },
        build: {
            commonjsOptions: { include: [] },
        },
        optimizeDeps: {
            disabled: false,
        },
    };
};