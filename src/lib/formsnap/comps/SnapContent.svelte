<script lang="ts">
	import { page } from '$app/state';
	import CopyCode from '$lib/components/web/code/CopyCode.svelte';
	import type { DocsType } from '$lib/examples/all-merge/type';
	import { all_formsnap_examples } from '../all_formsnap_examples/all_formsnap_examples';

	let paramId = page.url.pathname.split('/').pop();

	let index = all_formsnap_examples.findIndex((comp) => comp.id === paramId);
	let comp: DocsType = $derived(
		index !== -1 ? all_formsnap_examples[index] : all_formsnap_examples[0]
	);
</script>

{#each comp.allcode as item}
	<h2 class="text-3xl font-semibold">{item.name}</h2>
	<CopyCode code={item.code} lang="ts" />
{/each}
