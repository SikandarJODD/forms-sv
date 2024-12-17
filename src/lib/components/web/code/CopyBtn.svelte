<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';

	let { code = '' }: { code: string } = $props();
	let isCopied = $state(false);
	let copyCode = () => {
		navigator.clipboard.writeText(code);
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 1200);
	};
</script>

<div class="absolute right-2 top-2 text-muted-foreground">
	<Button size="icon" class=" [&_svg]:size-[16px]" variant="ghost" onclick={copyCode}>
		{#if isCopied}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-clipboard-check"
				><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path
					d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
				/><path d="m9 14 2 2 4-4" /></svg
			>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-copy"
				><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path
					d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
				/></svg
			>
		{/if}
	</Button>
</div>
