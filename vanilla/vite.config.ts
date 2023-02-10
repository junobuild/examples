import viteCompression from 'vite-plugin-compression';

export default () => {
    return {
        plugins: [viteCompression()],
    };
};