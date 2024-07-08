<script lang="ts">
	import { onMount } from 'svelte';
	import { initSatellite } from '@junobuild/core-peer';
	import Footer from '$lib/components/Footer.svelte';
	import Background from '$lib/components/Background.svelte';
	import '../app.css';
	import Auth from '$lib/components/Auth.svelte';

	onMount(
		async () =>
			await initSatellite({
				workers: {
					auth: true
				}
			})
	);
</script>

<div class="relative isolate min-h-[100dvh]">
	<main class="mx-auto max-w-screen-2xl py-16 px-8 md:px-24 tall:min-h-[calc(100dvh-128px)]">
		<h1 class="dark:text-white text-5xl md:text-6xl font-bold tracking-tight md:pt-24">
			Example App
		</h1>
		<p class="dark:text-white py-4 md:max-w-lg">
			Admin view.
		</p>

		<Auth>
			<slot />
		</Auth>
	</main>

	<Footer />

	<Background />
</div>
