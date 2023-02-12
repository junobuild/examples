<script lang="ts">
	import SignUp from '$lib/components/SignUp.svelte';
	import Get from '$lib/components/Get.svelte';
	import type { Doc } from '@junobuild/core';
	import type { Data } from '$lib/types/data';
	import Delete from '$lib/components/Delete.svelte';
	import IconVerified from '$lib/icons/IconVerified.svelte';

	let mode: 'insert' | 'get' | 'update' | 'delete' | 'insert_deleted' | 'insert_done' | 'deleted' =
		'insert';

	let doc: Doc<Data> | undefined = undefined;
	const update = ({ detail }) => {
		doc = detail?.doc ?? undefined;
		mode = doc !== undefined ? 'update' : 'insert';
	};

	const done = ({ detail }) => {
		console.log(detail);

		doc = detail?.doc ?? undefined;
		mode = 'insert_done';
	};
</script>

{#if mode === 'get'}
	<Get on:junoDoc={update} on:junoCancel={() => (mode = 'insert')} />
{:else if mode === 'delete'}
	<Delete
		on:junoDelete={update}
		on:junoDeleted={() => (mode = 'deleted')}
		on:junoCancel={() => (mode = 'insert')}
	/>
{:else if mode === 'update'}
	<p>Edit your subscription:</p>

	<SignUp {doc} on:junoSubmitted={done} />
{:else if mode === 'deleted'}
	<p>Your subscription has been deleted.</p>
{:else if mode === 'insert_done'}
	<div class="done">
		<IconVerified />
		<div>
			<p>Thanks for signing up. We will contact you very soon!</p>
			<p>
				Your subscription ID is <strong>{doc?.key ?? ''}</strong>. Use it to
				<button class="text" on:click={() => (mode = 'get')}>update</button>
				or
				<button class="text" on:click={() => (mode = 'delete')}>delete</button> your data.
			</p>
		</div>
	</div>
{:else if mode === 'insert_deleted'}
	<p>Your subscription has been deleted.</p>

	<SignUp doc={undefined} on:junoSubmitted={done} />
{:else}
	<SignUp doc={undefined} on:junoSubmitted={done} />

	<div class="already">
		I already signed-up. I want to <button class="text" on:click={() => (mode = 'get')}
			>update</button
		>
		or
		<button class="text" on:click={() => (mode = 'delete')}>delete</button> my subscription.
	</div>
{/if}

<style lang="scss">
	@use '../styles/mixins/fonts';

	button.text {
		margin: 0;
	}

	.already {
		@include fonts.small;
		color: var(--value-color);
		margin-top: var(--padding-4x);
	}

	.done {
		display: flex;
		align-items: center;
		gap: var(--padding-2x);

		p {
			margin: 0;
		}
	}
</style>
