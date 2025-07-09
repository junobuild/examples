<script lang="ts">
	const dev = import.meta.env.DEV;
	const satelliteId = import.meta.env.VITE_SATELLITE_ID;
	const satelliteMissing = satelliteId === undefined || satelliteId === '<DEV_SATELLITE_ID>';
	const showBanner = dev && satelliteMissing;
</script>

{#if showBanner}
	<div class="bg-screamin-green-200 fixed top-0 right-0 left-0 px-4 py-0.5 text-sm text-black">
		<p class="text-center font-medium">
			<span>Your project needs a Satellite for local dev.</span>
			<a
				href="http://localhost:5866"
				target="_blank"
				class="ml-2 inline-block font-bold underline"
				aria-label="Open the Juno Console to create a new Satellite for testing"
			>
				Create one now!
			</a>
		</p>
	</div>
{/if}
