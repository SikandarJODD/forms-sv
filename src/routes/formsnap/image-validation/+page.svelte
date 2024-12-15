<script lang="ts">
	import SnapImageValidation from '$lib/formsnap/image-validation/SnapImageValidation.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SnapImageValidation {data} />
