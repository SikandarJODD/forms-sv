<script lang="ts">
	import ClientServerForm from '$lib/examples/client-server/ClientServerForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<ClientServerForm {data} />
