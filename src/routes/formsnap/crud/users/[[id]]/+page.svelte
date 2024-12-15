<script lang="ts">
	import SnapCrudForm from '$lib/formsnap/crud/SnapCrudForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SnapCrudForm {data} />
