<script lang="ts">
	import { type Doc, setDoc } from '@junobuild/core';
	import type { Data } from '$lib/types/data';
	import { createEventDispatcher } from 'svelte';
	import { busy } from '../stores/busy.store';
	import { toasts } from '../stores/toasts.store';
	import { userSignedInStore } from '$lib/stores/user.store';
	import SignIn from '$lib/components/SignIn.svelte';
	import { userStore } from '../stores/user.store';
	import Delete from '$lib/components/Delete.svelte';

	export let doc: Doc<Data> | undefined = undefined;

	let email: string;
	let twitter: string;
	let github: string;
	let framework: string;
	let description: string;
	let key: string | undefined;

	const mapData = () => {
		key = doc?.key;
		email = doc?.data?.email;
		twitter = doc?.data?.twitter;
		github = doc?.data?.github;
		framework = doc?.data?.framework;
		description = doc?.data?.description;
	};

	$: doc, (() => mapData())();

	const dispatch = createEventDispatcher();

	const onSubmit = async () => {
		if (!$userSignedInStore) {
			toasts.error({
				text: 'You are not signed-in.'
			});
			return;
		}

		try {
			busy.start();

			const updatedDoc = await setDoc({
				collection: 'signup',
				doc: {
					...(doc && doc),
					// @ts-ignore it is not interfered but we know it is set
					key: $userStore.key,
					data: {
						email,
						twitter,
						github,
						framework,
						description
					}
				}
			});

			dispatch('junoSubmitted', { doc: updatedDoc });
		} catch (err: unknown) {
			toasts.error({
				text: 'Subscription failed.',
				detail: err
			});
		}

		busy.stop();
	};

	const frameworks = [
		'Angular',
		'Astro',
		'Ember',
		'Lit',
		'Next.js',
		'Nuxt',
		'Qwik',
		'React',
		'Solid',
		'Stencil',
		'Svelte',
		'Vue'
	];

	// Source: https://stackoverflow.com/a/46181/5404186
	const validateEmail = (email): boolean => {
		return email.match(
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	};

	let validEmail = false;
	$: validEmail = email !== undefined && email !== '' && validateEmail(email);
</script>

<form on:submit|preventDefault={onSubmit}>
	<label for="email">Your mail address (*):</label>
	<input
		id="email"
		type="email"
		name="email"
		placeholder="your@email.com"
		required
		bind:value={email}
	/>

	<label for="twitter">Your Twitter handle:</label>
	<input id="twitter" type="text" name="twitter" placeholder="@yourusername" bind:value={twitter} />

	<label for="github">Your GitHub username:</label>
	<input id="github" type="text" name="github" placeholder="yourusername" bind:value={github} />

	<label for="description">What do you plan to build with Juno?</label>
	<textarea maxlength="4096" id="description" bind:value={description} rows="5" />

	<label for="framework">Which JavaScript framework you will use?</label>
	<select bind:value={framework} id="framework">
		<option value={undefined} selected disabled hidden />

		{#each frameworks as framework}
			<option value={framework}>{framework}</option>
		{/each}

		<option value="other">Other</option>
	</select>

	{#if $userSignedInStore}
		<div class="toolbar">
			<Delete {doc} on:junoDeleted />

			<button disabled={!validEmail}>Submit</button>
		</div>
	{:else}
		<SignIn />
	{/if}

	<p class="notice">(*) Mail address is mandatory. Other fields are welcomed.</p>
</form>

<style lang="scss">
	@use '../styles/mixins/fonts';

	.toolbar {
		display: flex;
		gap: var(--padding-2x);
	}

	.notice {
		font-size: var(--font-size-very-small);
		margin-top: var(--padding-4x);
	}
</style>
