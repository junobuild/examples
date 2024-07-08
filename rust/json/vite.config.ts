import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import juno from '@junobuild/vite-plugin';

export default defineConfig({
	plugins: [sveltekit(), juno({ container: true })],
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			},
			plugins: [
				{
					name: 'fix-node-globals-polyfill',
					setup(build) {
						build.onResolve({ filter: /_virtual-process-polyfill_\.js/ }, ({ path }) => ({ path }));
					}
				}
			]
		}
	},
	worker: {
		plugins: () => [sveltekit()],
		format: 'es'
	}
});
