import {nodePolyfills} from 'vite-plugin-node-polyfills';

export default () => ({
    plugins: [nodePolyfills()],
    server: {
        port: 5174
    }
});