<script lang="ts">
	import { codeToHtml } from 'shiki';
	import { onMount } from 'svelte';
	import CopyBtn from './CopyBtn.svelte';
	let {
		code,
		lang = 'svelte'
	}: {
		code: string;
		lang?: string;
	} = $props();
	let codeText = $state('');
	onMount(async () => {
		codeText = await codeToHtml(code, {
			lang: `${lang}`,
			theme: 'vesper'
		});
	});
</script>

<div class="relative">
	<CopyBtn {code} />
	<div
		class="no-scollbar z-10 overflow-y-auto
	border
	bg-[#101010]
	p-4
	[&::-webkit-scrollbar-thumb]:hidden [&::-webkit-scrollbar-track]:hidden [&::-webkit-scrollbar]:hidden"
	>
		{#key codeText}
			{@html codeText}
		{/key}
	</div>
</div>
