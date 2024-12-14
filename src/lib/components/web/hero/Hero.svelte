<script>
	import AnimatedShinyText from '$lib/components/magicui/AnimatedShinyText.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="min-h-[90vh] bg-background">
	<div class="px-6 pt-14 lg:px-8">
		<div class="mx-auto max-w-5xl py-10">
			<div class="hidden sm:mb-8 sm:flex sm:justify-center">
				<AnimatedShinyText class="rounded-full border border-muted-foreground/40 px-5 py-1"
					>New Debounce Example</AnimatedShinyText
				>
			</div>
			<div class="text-center">
				<h1
					class="text-balance bg-gradient-to-b from-zinc-800 to-zinc-500 bg-clip-text pb-2 text-5xl font-semibold tracking-tight text-transparent dark:from-white dark:to-neutral-500 sm:text-6xl"
				>
					Supeforms & Formsnap Examples
				</h1>
				<p class="mt-4 text-pretty text-lg font-normal text-muted-foreground/70 sm:text-xl/8">
					i have build 20+ form examples using <a
						href="/"
						class="font-mono font-medium text-primary dark:text-sky-400">sveltekit-superforms</a
					>
					and <a href="/" class="font-mono font-medium dark:text-sky-400 text-primary">formsnap</a>.<br />
				</p>
				<div class="mt-10 flex items-center justify-center gap-x-4">
					<Button size="lg" href="/docs">Get Started</Button>
					<Button size="lg" variant="secondary" href="/formsnap">Formsnap Examples</Button>
				</div>
			</div>
		</div>
	</div>
</div>
