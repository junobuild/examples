<script lang="ts">
	import SignUp from '$lib/components/SignUp.svelte';
	import type { Doc } from '@junobuild/core';
	import type { Data } from '$lib/types/data';
	import IconVerified from '$lib/icons/IconVerified.svelte';
	import { toasts } from '../stores/toasts.store';
	import { userStore } from '../stores/user.store';
	import { getDoc } from '@junobuild/core';

	let mode: 'insert' | 'insert_done' | 'deleted' = 'insert';

	let doc: Doc<Data> | undefined = undefined;

	const loadData = async () => {
		if ($userStore === null || $userStore === undefined || $userStore.key === undefined) {
			doc = undefined;
			mode = 'insert';
			return;
		}

		try {
			const result: Doc<Data> | undefined = await getDoc({
				collection: 'signup',
				key: $userStore.key
			});

			doc =
				doc !== undefined
					? result !== undefined
						? {
								...doc,
								...result
						  }
						: {
								...doc
						  }
					: result !== undefined
					? {
							...result
					  }
					: undefined;
		} catch (err: unknown) {
			toasts.error({
				text: 'Error while loading your data',
				detail: err
			});
		}
	};

	$: $userStore, (async () => await loadData())();

	const done = ({ detail }) => {
		doc = detail?.doc ?? undefined;
		mode = 'insert_done';
	};

	const deleted = () => {
		doc = undefined;
		mode = 'deleted';
	};
</script>

{#if mode === 'deleted'}
	<p>Your subscription has been deleted.</p>
{:else if mode === 'insert_done'}
	<div class="done">
		<IconVerified />
		<div>
			<p>Thanks for signing up. We will contact you very soon!</p>
			<p>
				Your subscription ID is <strong>{doc?.key ?? ''}</strong>.
			</p>
		</div>
	</div>
{:else}
	<SignUp {doc} on:junoSubmitted={done} on:junoDeleted={deleted} />
{/if}

<style lang="scss">
	.done {
		display: flex;
		align-items: center;
		gap: var(--padding-2x);

		p {
			margin: 0;
		}
	}
</style>
