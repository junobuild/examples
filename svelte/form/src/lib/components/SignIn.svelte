<script lang="ts">
	import { signIn } from '@junobuild/core';
	import { toasts } from '../stores/toasts.store';
	import { busy } from '../stores/busy.store';

	const login = async () => {
		busy.start();

		try {
			await signIn();
		} catch (err: unknown) {
			toasts.error({
				text: 'Sign-in error.',
				detail: err
			});
		}

		busy.stop();
	};
</script>

<button type="button" on:click|stopPropagation={login} disabled={$busy}>Sign-in</button>
