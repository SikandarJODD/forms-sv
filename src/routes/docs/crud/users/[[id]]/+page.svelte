<script lang="ts">
	import CrudForm from '$lib/examples/crud/CrudForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<CrudForm {data} />
