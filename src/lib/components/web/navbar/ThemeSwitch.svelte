<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button onclick={toggleMode} variant="ghost" size="icon">
	{#if $mode === 'light'}
		<Sun strokeWidth={1.5} class="h-[1.2rem] w-[1.2rem]" />
	{:else}
		<Moon strokeWidth={1.5} class="h-[1.2rem] w-[1.2rem]" />
	{/if}
</Button>
