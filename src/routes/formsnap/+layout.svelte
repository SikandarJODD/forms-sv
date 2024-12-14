<script>
	import SnapSidebar from '$lib/formsnap/comps/SnapSidebar.svelte';

	let { children } = $props();
</script>

<SnapSidebar>
	{@render children()}
</SnapSidebar>
