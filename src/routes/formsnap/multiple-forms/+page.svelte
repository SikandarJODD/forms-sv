<script lang="ts">
	import SnapMultipleForms from '$lib/formsnap/multiple-forms/SnapMultipleForms.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SnapMultipleForms {data} />
