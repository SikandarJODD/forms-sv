<script lang="ts">
	import { createTableOfContents } from '@melt-ui/svelte';
	import { pushState } from '$app/navigation';
	import Tree from '$lib/components/web/table-of-contents/Tree.svelte';
	import DocsPageContent from '$lib/examples/comps/DocsPageContent.svelte';
	import MultiStepServer from '$lib/examples/multi-step-server/MultiStepServer.svelte';
	import type { PageData } from './$types';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree }
	} = createTableOfContents({
		selector: '#toc-builder-preview',
		activeType: 'all',
		pushStateFn: pushState,
		headingFilterFn: (heading) => !heading.hasAttribute('data-toc-ignore'),
		scrollFn: (id) => {
			const container = document.getElementById('toc-builder-preview');
			const element = document.getElementById(id);

			if (container && element) {
				let visitPositon = element.offsetTop - container.offsetTop - 16;
				window.scrollTo({
					top: visitPositon,
					behavior: 'smooth'
				});
			}
		}
	});
</script>

<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-9">
	<div
		id="toc-builder-preview"
		class="space-y-2 rounded-lg py-4 md:pl-2 md:pr-6 lg:col-span-7 lg:border-r lg:border-dashed"
	>
		<h2 class="text-3xl font-semibold">Multi-Step Server Form</h2>
		<p class="text-muted-foreground">
			An example of how to use multi-step forms with server-side validation in SvelteKit.
			This will reload the page on each step. The form data will be stored using Snapshots.
		</p>

		<!-- Main Form -->
		<MultiStepServer {data} />

		<!-- Content -->
		<DocsPageContent />
	</div>

	<div
		class="sticky top-20 z-50 -mt-2.5 h-fit overflow-y-auto rounded-lg bg-zinc-950 p-4 lg:col-span-2"
	>
		<p class="font-semibold text-primary">On This Page</p>
		<nav>
			{#key $headingsTree}
				<Tree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
			{/key}
		</nav>
	</div>
</div>
