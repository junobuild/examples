<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { signIn } from '@junobuild/core';

	const login = async () => {
		await signIn();
	};
</script>

<Button on:click={login}>Sign in</Button>
