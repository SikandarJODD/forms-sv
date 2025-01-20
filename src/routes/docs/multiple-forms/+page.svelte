<script lang="ts">
	import DocsPageContent from '$lib/examples/comps/DocsPageContent.svelte';
	import MultipleForm from '$lib/examples/multiple-forms/MultipleForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	import { createTableOfContents } from '@melt-ui/svelte';
	import { pushState } from '$app/navigation';
	import Tree from '$lib/components/web/table-of-contents/Tree.svelte';

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree }
	} = createTableOfContents({
		selector: '#toc-builder-preview',
		// exclude: ['h1', 'h4', 'h5', 'h6'],
		activeType: 'all',
		/**
		 * Here we can optionally provide SvelteKit's `pushState` function.
		 * This function preserve navigation state within the framework.
		 */
		pushStateFn: pushState,
		headingFilterFn: (heading) => !heading.hasAttribute('data-toc-ignore'),
		scrollFn: (id) => {
			/**
			 * Here we're overwriting the default scroll function
			 * so that we only scroll within the ToC preview
			 * container, instead of the entire page.
			 */
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
		<h2 class="text-3xl font-semibold">Multiple Forms</h2>
		<p class="text-muted-foreground">
			Simple Example of Multiple Forms with Different Fields on same page.
		</p>

		<!-- Main Form -->
		<MultipleForm {data} />

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
