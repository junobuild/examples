<script lang="ts">
	import type { Snippet } from 'svelte';
	import { initSatellite } from '@junobuild/core';
	import Footer from '$lib/components/Footer.svelte';
	import Background from '$lib/components/Background.svelte';
	import '../app.css';
	import Auth from '$lib/components/Auth.svelte';
	import Banner from '$lib/components/Banner.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const init = async () => {
		await initSatellite({
			workers: {
				auth: true
			}
		});
	};

	$effect(() => {
		init();
	});
</script>

<div class="relative isolate min-h-[100dvh]">
	<Banner />

	<main
		class="mx-auto max-w-(--breakpoint-2xl) px-8 py-16 md:px-24 [@media(min-height:800px)]:min-h-[calc(100dvh-128px)]"
	>
		<h1 class="text-5xl font-bold tracking-tight md:pt-24 md:text-6xl dark:text-white">
			Example App
		</h1>
		<p class="py-4 md:max-w-lg dark:text-white">
			Explore this demo app built with SvelteKit, Tailwind, and
			<a href="https://juno.build" rel="noopener noreferrer" target="_blank" class="underline">
				Juno</a
			>, showcasing a practical application of these technologies.
		</p>

		<Auth>
			{@render children()}
		</Auth>
	</main>

	<Footer />

	<Background />
</div>
