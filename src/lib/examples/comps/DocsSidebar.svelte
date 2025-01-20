<script>
	import { page } from '$app/state';

	let { children } = $props();
	let subnavs = [
		{
			name: 'Svelte with Zod',
			url: '/docs/svelte-zod',
			desc: 'This Example shows how to use Zod with Svelte.'
		},
		// {
		// 	name: 'Superform Client',
		// 	url: '/docs/superform',
		// 	desc: 'Svelte + ZOD + Sveltekit-Superforms - Client Side'
		// },
		{
			name: 'Client Server',
			url: '/docs/client-server',
			desc: 'Client and Server Side Validations'
		},
		{
			name: 'Multiple Forms',
			url: '/docs/multiple-forms',
			desc: 'This Example shows how to use Zod with Svelte.'
		},
		{
			name: 'Image and Images Validation',
			url: '/docs/image-validation',
			desc: 'Image and Images Validation using Zod'
		},
		{
			name: 'Debounce Username',
			url: '/docs/debounce-username',
			desc: 'Debounce Username using throttle-debounce'
		},
		{
			name: 'CRUD Superforms',
			url: '/docs/crud',
			desc: 'Fully Functional CRUD Superforms + ZOD'
		},
		{
			name: 'Multi Step Server Form',
			url: '/docs/multi-step-server',
			desc: 'This will reload the page on each step'
		},
		{
			name: 'Multi Step Client form',
			url: '/docs/multi-step-client',
			desc: 'This will not reload the page on each step, all validation are done on the client side.'
		}
	];
	let isMobileMenuOpen = $state(false);
	let isActive = $derived(page.url.pathname);
</script>

<div>
	<div
		class="{isMobileMenuOpen
			? 'opacity-100'
			: 'opacity-0'} relative z-50 transition-opacity duration-300 ease-linear lg:hidden"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="{isMobileMenuOpen
				? 'translate-x-0'
				: '-translate-x-full'} fixed inset-0 bg-zinc-900/80 transition duration-300 ease-in-out"
			aria-hidden="true"
		></div>

		<div
			class="{isMobileMenuOpen
				? 'translate-x-0'
				: '-translate-x-full'} fixed inset-0 flex transform transition duration-300 ease-in-out"
		>
			<div
				class="{isMobileMenuOpen
					? 'opacity-100'
					: 'opacity-0'} relative mr-16 flex w-full max-w-xs flex-1 duration-300 ease-in-out"
			>
				<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
					<button type="button" class="-m-2.5 p-2.5" onclick={() => (isMobileMenuOpen = false)}>
						<span class="sr-only">Close sidebar</span>
						<svg
							class="size-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							data-slot="icon"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div
					class="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-2 ring-1 ring-white/10"
				>
					<div class="mt-4 flex h-10 shrink-0 items-center">Docs</div>
					<nav class="flex flex-1 flex-col">
						<ul role="list" class="flex flex-1 flex-col gap-y-7">
							<li>
								<ul role="list" class="-mx-2 space-y-1">
									{#each subnavs as item}
										<li>
											<a
											 onclick={() => (isMobileMenuOpen = false)}
												href={item.url}
												class="group flex gap-x-3 rounded-md p-2 text-sm/6 text-muted-foreground"
											>
												{item.name}
											</a>
										</li>
									{/each}
								</ul>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>

	<!-- Static sidebar for desktop -->
	<div class="mt-[65px] hidden border-r lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pt-4">
			<nav class="flex flex-1 flex-col">
				<h2 class="mb-2 text-xl font-semibold">Superforms Examples</h2>
				<ul role="list" class="flex flex-1 flex-col">
					<li>
						<ul role="list" class="-mx-2">
							{#each subnavs as { name, url }}
								<li>
									<a
										href={url}
										class={[
											'group flex gap-x-3 rounded-md p-2 text-sm/6 font-normal text-muted-foreground  transition-all duration-200 hover:text-white',
											isActive === url ? 'bg-zinc-900 text-white' : ''
										]}
									>
										{name}
									</a>
								</li>
							{/each}
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	<div
		class="sticky top-0 z-40 flex w-full items-center justify-between gap-x-6 border-b bg-background px-4 py-4 shadow-sm sm:px-6 lg:hidden"
	>
		<div class="flex-1 text-sm/6 font-semibold text-white">Sveltekit Superforms Examples</div>
		<button
			type="button"
			class="-m-2.5 p-2.5 text-gray-400 lg:hidden"
			onclick={() => (isMobileMenuOpen = true)}
		>
			<span class="sr-only">Open sidebar</span>
			<svg
				class="size-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				aria-hidden="true"
				data-slot="icon"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</button>
	</div>

	<main class="py-2 lg:py-10 lg:pl-72">
		<div class="px-4 sm:px-6 lg:px-8">
			{@render children()}
		</div>
	</main>
</div>
