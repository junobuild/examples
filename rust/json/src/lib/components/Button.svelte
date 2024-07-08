<script lang="ts">
	export let disabled: boolean | undefined = undefined;
</script>

<button
	on:click
	{disabled}
	class={`flex items-center gap-2 border-black dark:border-lavender-blue-500 border-[3px] transition-all rounded-sm py-1 px-8 my-2 font-semibold text-white bg-lavender-blue-500 dark:bg-black shadow-[5px_5px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_#7888ff] ${disabled === true ? 'opacity-25' : 'hover:bg-lavender-blue-600 dark:hover:bg-lavender-blue-300 dark:hover:text-black active:bg-lavender-blue-400 dark:active:bg-lavender-blue-500 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]'}`}
>
	<slot />
</button>
