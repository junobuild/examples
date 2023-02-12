<script lang="ts">
	import { fade } from 'svelte/transition';
	import { busy } from '$lib/stores/busy.store';
	import IconClose from '$lib/icons/IconClose.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	const close = () => busy.stop();
</script>

{#if $busy !== undefined}
	<div transition:fade>
		{#if $busy.close}
			<div class="backdrop" on:click={close} />
		{/if}

		<div class="content">
			{#if $busy.close}
				<button on:click|stopPropagation={close} aria-label="Close" class="text close"
					><IconClose /></button
				>
			{/if}

			{#if $busy.spinner}
				<div class="spinner">
					<Spinner />
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@use '../styles/mixins/interaction';
	@use '../styles/mixins/overlay';
	@use '../styles/mixins/display';

	div {
		z-index: calc(var(--z-index) + 1000);

		position: fixed;
		@include display.inset;

		@include overlay.backdrop(dark);
	}

	.backdrop {
		position: absolute;
		@include display.inset;

		background: transparent;

		@include interaction.tappable;
	}

	.content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		width: fit-content;

		background: transparent;
	}

	.spinner {
		position: relative;
		height: 30px;
		margin: 1.45rem;
	}

	.close {
		align-self: flex-end;
	}

	.text {
		color: var(--color-card);
	}
</style>
