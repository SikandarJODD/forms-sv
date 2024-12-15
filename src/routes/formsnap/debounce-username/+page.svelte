<script lang="ts">
	import SnapDebounceUsername from '$lib/formsnap/debounce-username/SnapDebounceUsername.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SnapDebounceUsername {data} />
