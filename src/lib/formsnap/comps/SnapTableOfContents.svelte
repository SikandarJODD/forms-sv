<script>
	import { createTableOfContents } from '@melt-ui/svelte';
	import { pushState } from '$app/navigation';
	import Tree from '$lib/components/web/table-of-contents/Tree.svelte';

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
