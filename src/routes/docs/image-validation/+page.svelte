<script lang="ts">
	import ImageValidation from '$lib/examples/image-validation/ImageValidation.svelte';
	import type { PageData } from './$types';

	let {
		data
	}: {
		data: PageData;
	} = $props();
</script>

<ImageValidation {data} />
