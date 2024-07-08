<script lang="ts">
	export let spinner = false;
</script>

<div
	class:backdrop-blur-sm={spinner}
	class:backdrop-blur-xl={!spinner}
	class="fixed inset-0 z-40 bg-white/30 flex items-center justify-center"
>
	{#if spinner}
		<div
			class="w-12 h-12 rounded-full animate-spin border-[3px] border-solid border-lavender-blue-600 border-t-transparent"
		></div>
	{/if}
</div>
