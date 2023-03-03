import viteCompression from 'vite-plugin-compression';

export default () => {
    return {
        plugins: [viteCompression()],
        server: {
            port: 5174
        }
    };
};