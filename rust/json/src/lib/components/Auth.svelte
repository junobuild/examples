<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { authSubscribe } from '@junobuild/core';
	import { userStore } from '$lib/stores/user.store';
	import { userSignedIn } from '$lib/derived/user.derived';
	import Logout from '$lib/components/Logout.svelte';
	import Login from '$lib/components/Login.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let unsubscribe: (() => void) | undefined = undefined;

	onMount(() => (unsubscribe = authSubscribe((user) => userStore.set(user))));

	const automaticSignOut = () => console.log('Automatically signed out because session expired');

	onDestroy(() => unsubscribe?.());
</script>

<svelte:window onjunoSignOutAuthTimer={automaticSignOut} />

{#if $userSignedIn}
	<div>
		{@render children()}

		<Logout />
	</div>
{:else}
	<Login />
{/if}
