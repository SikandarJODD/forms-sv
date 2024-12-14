<script lang="ts">
	import Tree from './Tree.svelte';
	import { type TableOfContentsItem, type TableOfContentsElements, melt } from '@melt-ui/svelte';

	// export let tree: TableOfContentsItem[] = [];
	// export let activeHeadingIdxs: number[];
	// export let item: TableOfContentsElements['item'];
	type Props = {
		level?: number;
		tree: TableOfContentsItem[];
		activeHeadingIdxs: number[];
		item: TableOfContentsElements['item'];
	};
	let { level = 1, tree = [], activeHeadingIdxs, item }: Props = $props();
</script>

<ul class="m-0 list-none {level !== 1 ? 'pl-4' : ''}">
	{#if tree && tree.length}
		{#each tree as heading, i (i)}
			<li class="mt-0 pt-2">
				<a
					href="#{heading.id}"
					{...$item(heading.id)}
					use:item
					class="hover:!text-magnum-600 data-[active]:text-magnum-700 inline-flex items-center justify-center gap-1 text-neutral-500
             no-underline transition-colors"
				>
					<!--
              Along with the heading title, the original heading node
              is also passed down, so you can display headings
              however you want.
            -->
					{@html heading.node.innerHTML}
				</a>
				{#if heading.children && heading.children.length}
					<!-- <svelte:self tree={heading.children} level={level + 1} {activeHeadingIdxs} {item} /> -->
					<Tree tree={heading.children} level={level + 1} {activeHeadingIdxs} {item} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>
