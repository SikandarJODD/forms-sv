<script lang="ts">
	import SvelteSuperForm from '$lib/examples/superforms/SvelteSuperForm.svelte';
	import type { PageData } from '../../$types';

	let {
		data
	}: {
		data: PageData;
	} = $props();
</script>

<SvelteSuperForm {data} />
