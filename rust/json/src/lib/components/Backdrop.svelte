<script lang="ts">
	interface Props {
		spinner?: boolean;
	}

	let { spinner = false }: Props = $props();
</script>

<div
	class="dark:bg-lavender-blue-200/40 fixed inset-0 z-40 flex items-center justify-center bg-white/30 backdrop-blur-xl"
>
	{#if spinner}
		<div
			class="border-lavender-blue-600 h-12 w-12 animate-spin rounded-full border-[3px] border-solid border-t-transparent"
		></div>
	{/if}
</div>
