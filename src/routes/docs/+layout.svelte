<script>
	import DocsSidebar from '$lib/examples/comps/DocsSidebar.svelte';

	let { children } = $props();
</script>

<DocsSidebar>
	{@render children()}
</DocsSidebar>
