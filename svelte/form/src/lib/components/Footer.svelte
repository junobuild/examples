<script lang="ts">
	import IconGitHub from '$lib/icons/IconGitHub.svelte';
	import IconTwitter from '$lib/icons/IconTwitter.svelte';
</script>

<footer>
	<a
		href="https://twitter.com/JunoBuild"
		rel="external noopener noreferrer"
		target="_blank"
		aria-label="GitHub"><IconTwitter /></a
	>

	<a
		href="https://github.com/junobuild/juno"
		rel="external noopener noreferrer"
		target="_blank"
		aria-label="GitHub"><IconGitHub /></a
	>
</footer>

<style lang="scss">
	@use '../styles/mixins/media';

	footer {
		display: flex;
		justify-content: center;
		gap: var(--padding);
		padding: 0 0 var(--padding-4x);
	}
</style>
