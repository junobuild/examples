<script lang="ts">
	import Backdrop from '$lib/components/Backdrop.svelte';
	import Button from '$lib/components/Button.svelte';
	import { userSignedIn } from '$lib/derived/user.derived';
	import { setDoc, uploadFile } from '@junobuild/core-peer';
	import { nanoid } from 'nanoid';
	import type { Note } from '$lib/types/note';
	import { userStore } from '$lib/stores/user.store';

	let showModal = false;

	let inputText = '';
	let file: File | undefined = undefined;

	let inputFile: HTMLInputElement | null = null;

	let progress = false;

	let valid = false;
	$: valid = inputText !== '' && $userSignedIn;

	const reload = () => {
		const event = new CustomEvent('exampleReload');
		window.dispatchEvent(event);
	};

	const add = async () => {
		// Demo purpose therefore edge case not properly handled
		if ($userStore === undefined || $userStore === null) {
			return;
		}

		progress = true;

		try {
			let url;

			if (file !== undefined) {
				const filename = `${$userStore.key}-${file.name}`;

				const { downloadUrl } = await uploadFile({
					collection: 'images',
					data: file,
					filename
				});

				url = downloadUrl;
			}

			const key = nanoid();

			await setDoc<Note>({
				collection: 'notes',
				doc: {
					key,
					data: {
						text: inputText,
						...(url !== undefined && { url })
					}
				}
			});

			showModal = false;

			reload();
		} catch (err) {
			console.error(err);
		}

		progress = false;
	};

	const onChangeFile = ($event: Event) =>
		(file = ($event as unknown as { target: EventTarget & HTMLInputElement }).target?.files?.[0]);

	const openSelectFile = () => inputFile?.click();
</script>

<Button on:click={() => (showModal = true)}>
	Add an entry
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="20"
		viewBox="0 -960 960 960"
		width="20"
		fill="currentColor"
	>
		<path d="M417-417H166v-126h251v-251h126v251h251v126H543v251H417v-251Z" />
	</svg>
</Button>

{#if showModal}
	<div class="fixed inset-0 z-50 p-16 md:px-24 md:py-44 animate-fade" role="dialog">
		<div class="relative w-full max-w-xl">
			<textarea
				class="form-control block w-full px-3 py-1.5 text-base font-normal m-0 resize-none border-black border-[3px] rounded-sm bg-white shadow-[5px_5px_0px_rgba(0,0,0,1)] focus:outline-none"
				rows={7}
				placeholder="Your diary entry"
				bind:value={inputText}
				disabled={progress}
			></textarea>

			<div role="toolbar" class="flex justify-between items-center">
				<div>
					<button
						aria-label="Attach a file to the entry"
						class="flex gap-2 items-center hover:text-lavender-blue-600 active:text-lavender-blue-400"
						on:click={openSelectFile}
					>
						<svg
							width="20"
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
						<span class="truncate max-w-48">
							<small>{file !== undefined ? file.name : 'Attach file'}</small>
						</span>
					</button>

					<input
						type="file"
						class="fixed right-0 -bottom-24 opacity-0"
						on:change={onChangeFile}
						disabled={progress}
						bind:this={inputFile}
					/>
				</div>

				{#if progress}
					<div
						class="my-8 animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full"
						role="status"
						aria-label="loading"
					>
						<span class="sr-only">Loading...</span>
					</div>
				{:else}
					<div class="flex my-4">
						<button
							class="py-1 px-8 hover:text-lavender-blue-600 active:text-lavender-blue-400"
							type="button"
							on:click={() => (showModal = false)}
						>
							Close
						</button>

						<Button on:click={add} disabled={!valid}>Submit</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<Backdrop />
{/if}
