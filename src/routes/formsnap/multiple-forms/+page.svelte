<script lang="ts">
	import SnapContent from '$lib/formsnap/comps/SnapContent.svelte';
	import SnapTableOfContents from '$lib/formsnap/comps/SnapTableOfContents.svelte';
	import SnapMultipleForms from '$lib/formsnap/multiple-forms/SnapMultipleForms.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-9">
	<div
		id="toc-builder-preview"
		class="space-y-2 rounded-lg lg:border-r lg:border-dashed py-4 pl-2 pr-6 lg:col-span-7"
	>
		<h2 class="text-3xl font-semibold">Superforms Detailed Example</h2>
		<p class="text-muted-foreground">Detailed example of superforms and svelte.</p>

		<!-- Main Form -->
		<SnapMultipleForms {data} />

		<!-- Content -->
		<SnapContent />
	</div>

	<SnapTableOfContents />
</div>
