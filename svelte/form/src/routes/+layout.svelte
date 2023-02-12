<script>
	import Footer from '$lib/components/Footer.svelte';
	import Busy from '$lib/components/Busy.svelte';
	import Toasts from '$lib/components/Toasts.svelte';
</script>

<slot />

<Footer />

<Busy />
<Toasts />

<style lang="scss" global>
	@import '../lib/styles/global.scss';
</style>
