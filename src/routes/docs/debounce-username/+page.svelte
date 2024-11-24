<script lang="ts">
	import DebounceUsername from '$lib/examples/debounce-username/DebounceUsername.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<DebounceUsername {data} />
