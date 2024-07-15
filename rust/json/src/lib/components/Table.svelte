<script lang="ts">
	import type { Note } from '$lib/types/note';
	import { type Doc, listDocs } from '@junobuild/core-peer';
	import Delete from '$lib/components/Delete.svelte';
	import { userNotSignedIn, userSignedIn } from '$lib/derived/user.derived';

	let items: Doc<Note>[] = [];

	const list = async () => {
		if ($userNotSignedIn) {
			items = [];
			return;
		}

		const { items: data } = await listDocs<Note>({
			collection: 'notes',
			filter: {}
		});

		items = data;
	};

	$: $userSignedIn, (async () => await list())();
</script>

<svelte:window on:exampleReload={list} />

<div class="w-full max-w-2xl mt-8 dark:text-white" role="table">
	<div role="row">
		<span role="columnheader" aria-sort="none"> Entries </span>
	</div>

	<div class="py-2" role="rowgroup">
		{#each items as item, index}
			<div
				class="flex items-center gap-2 px-3 mb-4 border-black dark:border-lavender-blue-500 border-[3px] rounded bg-white dark:bg-black dark:text-white transition-all shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_#7888FF]"
				role="row"
			>
				<span role="cell" aria-rowindex={index} class="p-1 flex align-center min-w-max">
					{index + 1}
				</span>
				<div role="cell" class="line-clamp-3 overflow-hidden grow">{item.data.text}</div>
				<div role="cell" class="flex gap-2 justify-center align-middle">
					{#if item.data.url !== undefined}
						<a
							aria-label="Open data"
							rel="noopener noreferrer"
							href={item.data.url}
							target="_blank"
							class="hover:text-lavender-blue-500 active:text-lavender-blue-400"
						>
							<svg
								width="16"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 29 29"
								fill="currentColor"
							>
								<g>
									<rect fill="none" class="opacity-25" width="29" height="29" />
									<path
										d="M8.36,26.92c-2,0-3.88-.78-5.29-2.19C.15,21.81.15,17.06,3.06,14.14L12.57,4.64c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41L4.48,15.56c-2.14,2.14-2.14,5.62,0,7.76,1.04,1.04,2.41,1.61,3.88,1.61s2.84-.57,3.88-1.61l12.79-12.79c1.47-1.47,1.47-3.87,0-5.34-1.47-1.47-3.87-1.47-5.34,0l-12.45,12.45c-.73.73-.73,1.91,0,2.64.73.73,1.91.73,2.64,0l9.17-9.17c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-9.17,9.17c-1.51,1.51-3.96,1.51-5.47,0-1.51-1.51-1.51-3.96,0-5.47L18.26,3.77c2.25-2.25,5.92-2.25,8.17,0s2.25,5.92,0,8.17l-12.79,12.79c-1.41,1.41-3.29,2.19-5.29,2.19Z"
									/>
								</g>
							</svg>
						</a>
					{/if}

					<Delete doc={item} on:deleted={list} />
				</div>
			</div>
		{/each}
	</div>
</div>
