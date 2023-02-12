import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: {
			plugins: [autoprefixer]
		}
	}),

	kit: {
		adapter: adapter({
			precompress: true
		})
	},
	serviceWorker: {
		register: false
	}
};

export default config;
