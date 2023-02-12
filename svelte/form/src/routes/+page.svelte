<script lang="ts">
	import { onMount } from 'svelte';
	import { initDapp } from '@junobuild/core';
	import Logo from '$lib/assets/juno_logo_white.svg';
	import Main from '$lib/components/Main.svelte';

	onMount(
		async () =>
			await initDapp({
				satelliteId: 'jx5yt-yyaaa-aaaal-abzbq-cai'
			})
	);
</script>

<main>
	<a href="/"
		><h1><img src={Logo} role="presentation" loading="lazy" decoding="async" alt="Juno" /></h1></a
	>
	<p>
		Sign-up to join <a href="https://juno.build" target="_blank" rel="noreferrer noopener">Juno</a> closed
		beta.
	</p>

	<section>
		<Main />
	</section>
</main>

<style lang="scss">
	@use '../lib/styles/mixins/media';
	@use '../lib/styles/mixins/shadow';

	main {
		max-width: media.$breakpoint-large;
		padding: var(--padding-4x) var(--padding-2x);

		@include media.min-width(large) {
			margin: var(--padding-8x) auto 0;
		}
	}

	h1 {
		font-size: 3rem;
		width: 50%;
	}

	p {
		margin: 0 0 var(--padding-2x);
	}

	section {
		margin: var(--padding-4x) 0;
		padding: var(--padding-2x);

		@include shadow.card;

		@include media.min-width(large) {
			padding: var(--padding-4x);
		}
	}
</style>
