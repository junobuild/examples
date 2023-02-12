<script lang="ts">
	import { getDoc } from '@junobuild/core';
	import { createEventDispatcher } from 'svelte';
	import { busy } from '../stores/busy.store';
	import { toasts } from '../stores/toasts.store';

	let id: string;

	const dispatch = createEventDispatcher();

	const onSubmit = async () => {
		try {
			busy.start();

			const doc = await getDoc({
				collection: 'signup',
				key: id
			});

			dispatch('junoDoc', { doc });
		} catch (err: unknown) {
			dispatch('junoDoc', { doc: undefined });

			toasts.error({
				text: 'Cannot retrieve your subscription.',
				detail: err
			});
		}

		busy.stop();
	};
</script>

<p>Find your subscription:</p>

<form on:submit|preventDefault={onSubmit}>
	<input
		id="id"
		type="text"
		placeholder="Your subscription ID"
		name="id"
		required
		bind:value={id}
	/>

	<div class="toolbar">
		<button role="button" on:click={() => dispatch('junoCancel')}>Cancel</button>
		<button>Submit</button>
	</div>
</form>

<style lang="scss">
	p {
		margin: 0;
	}
</style>
