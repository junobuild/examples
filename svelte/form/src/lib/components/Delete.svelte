<script lang="ts">
	import { delDoc, type Doc } from '@junobuild/core';
	import { createEventDispatcher } from 'svelte';
	import { busy } from '../stores/busy.store';
	import { toasts } from '../stores/toasts.store';
	import type { Data } from '../types/data';

	export let doc: Doc<Data> | undefined = undefined;

	const dispatch = createEventDispatcher();

	const deleteDoc = async () => {
		try {
			busy.start();

			await delDoc({
				collection: 'signup',
				doc: doc as Doc<Data>
			});

			dispatch('junoDeleted');
		} catch (err: unknown) {
			toasts.error({
				text: 'Something went wrong while deleting your subscription.',
				detail: err
			});
		}

		busy.stop();
	};
</script>

{#if doc !== undefined}
	<button type="button" on:click|stopPropagation={deleteDoc}>Delete</button>
{/if}
