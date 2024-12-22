<script lang="ts">
	import { page } from '$app/stores';
	import CopyCode from '$lib/components/web/code/CopyCode.svelte';
	import { allExamples } from '../all-merge/all-examples';
	import type { DocsType } from '../all-merge/type';

	let paramId = $page.url.pathname.split('/').pop();

	let index = allExamples.findIndex((comp) => comp.id === paramId);
	let comp: DocsType = $derived(index !== -1 ? allExamples[index] : allExamples[0]);
</script>

{#each comp.allcode as item}
	<h2 class="text-3xl font-semibold">{item.name}</h2>
	<CopyCode code={item.code} lang="ts" />
{/each}
