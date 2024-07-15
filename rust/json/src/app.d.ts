// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	/* eslint-disable */

	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:junoSignOutAuthTimer'?: (event: CustomEvent<any>) => void;
			'on:exampleReload'?: (event: CustomEvent<any>) => void;
		}
	}

	/* eslint-enable */
}

export {};
