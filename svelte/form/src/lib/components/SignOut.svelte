<script lang="ts">
	import { signOut } from '@junobuild/core';
	import IconSignOut from '$lib/icons/IconSignOut.svelte';
	import { userSignedInStore } from '$lib/stores/user.store';
</script>

{#if $userSignedInStore}
	<p>
		<button type="button" class="text" on:click|stopPropagation={signOut}
			><IconSignOut /> Sign-out</button
		>
	</p>
{/if}

<style lang="scss">
	@use '../styles/mixins/fonts';

	button.text {
		margin: 0;
		gap: var(--padding);

		&:hover,
		&:focus {
			background: transparent;
			color: var(--color-tertiary);
		}
	}

	p {
		@include fonts.small;
		color: var(--value-color);
		margin-top: var(--padding-4x);
		text-align: center;
		color: black;
	}
</style>
