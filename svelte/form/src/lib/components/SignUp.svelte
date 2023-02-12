<script lang="ts">
	import { type Doc, setDoc } from '@junobuild/core';
	import { nanoid } from 'nanoid';
	import type { Data } from '$lib/types/data';
	import { createEventDispatcher, onMount } from 'svelte';
	import { busy } from '../stores/busy.store';
	import { toasts } from '../stores/toasts.store';

	export let doc: Doc<Data> | undefined = undefined;

	let email: string;
	let twitter: string;
	let github: string;
	let framework: string;
	let description: string;
	let key: string | undefined;

	onMount(() => {
		key = doc?.key;
		email = doc?.data?.email;
		twitter = doc?.data?.twitter;
		github = doc?.data?.github;
		framework = doc?.data?.framework;
		description = doc?.data?.description;
	});

	const dispatch = createEventDispatcher();

	const onSubmit = async () => {
		try {
			busy.start();

			const id = key ?? nanoid();

			const updatedDoc = await setDoc({
				collection: 'signup',
				doc: {
					...(doc && doc),
					key: id,
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
	<label for="email">Your mail address:</label>
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

	<button disabled={!validEmail}>Submit</button>
</form>
