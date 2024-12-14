<script>
	import ZodValidation from '$lib/examples/zod-validation/ZodValidation.svelte';
	let { form } = $props();

	import { createTableOfContents } from '@melt-ui/svelte';
	import { pushState } from '$app/navigation';
	import Tree from '$lib/components/web/table-of-contents/Tree.svelte';
	import SvelteZodDesc from '$lib/examples/zod-validation/SvelteZodDesc.svelte';

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
				container.scrollTo({
					top: element.offsetTop - container.offsetTop - 16,
					behavior: 'smooth'
				});
			}
		}
	});

	let hideHeading = $state(false);
</script>

<div class="grid h-[90vh] grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-9">
	<div
		id="toc-builder-preview"
		class="no-scrollbar space-y-2 overflow-y-auto rounded-lg px-6 py-4 lg:col-span-7"
	>
		<h2 class="text-3xl font-semibold">Zod Validation</h2>
		<p class="text-muted-foreground">
			An example of how to use Zod to validate form data in SvelteKit.
		</p>

		<!-- Main Form -->
		<ZodValidation {form} />


		<!-- Content -->
		<SvelteZodDesc />
	</div>

	<div class="overflow-y-auto rounded-lg border-l border-dashed bg-background p-4 lg:col-span-2">
		<p class="font-semibold text-primary">On This Page</p>
		<nav>
			{#key $headingsTree}
				<Tree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
			{/key}
		</nav>
	</div>
</div>
