<script lang="ts">
	import { delDoc, getDoc } from '@junobuild/core';
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

			await delDoc({
				collection: 'signup',
				doc
			});

			dispatch('junoDeleted', { doc });
		} catch (err: unknown) {
			dispatch('junoUpdate', { doc: undefined });

			toasts.error({
				text: 'Something went wrong while deleting your subscription.',
				detail: err
			});
		}

		busy.stop();
	};
</script>

<p>Delete your subscription:</p>

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
		<button>Delete</button>
	</div>
</form>

<style lang="scss">
	p {
		margin: 0;
	}
</style>
