<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { fade, fly, slide } from 'svelte/transition';

	let navs = [
		{
			name: 'Home',
			url: '/'
		},
		{
			name: 'Docs',
			isOpen: false,
			subnavs: [
				{
					name: 'Svelte with Zod',
					url: '/docs/svelte-zod',
					desc: 'This Example shows how to use Zod with Svelte.'
				},
				{
					name: 'Superform Client',
					url: '/docs/superform',
					desc: 'Svelte + ZOD + Sveltekit-Superforms - Client Side'
				},
				{
					name: 'Client-Server',
					url: '/docs/client-server',
					desc: 'Client and Server Side Validations'
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
					url: '/docs/debounce-username',
					desc: 'Fully Functional CRUD Superforms + ZOD'
				},
			]
		}
	];
</script>

<header class="border-b bg-background">
	<nav
		class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
		aria-label="Global"
	>
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5" aria-label="home">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-file-text text-primary"
					><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path
						d="M14 2v4a2 2 0 0 0 2 2h4"
					/><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg
				>
			</a>
		</div>
		<div class="flex lg:hidden">
			<button
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
			>
				<span class="sr-only">Open main menu</span>
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
		<div class="hidden lg:flex lg:gap-x-12">
			{#each navs as nav}
				{#if nav?.subnavs}
					<div class="relative">
						<button
							type="button"
							class="flex items-center gap-x-1 text-sm/6 font-semibold text-primary"
							aria-expanded="false"
							onclick={() => (nav.isOpen = !nav.isOpen)}
						>
							{nav.name}
							<svg
								class="size-5 flex-none text-gray-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								data-slot="icon"
							>
								<path
									fill-rule="evenodd"
									d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>

						{#if nav.isOpen}
							<div
								transition:fly={{ y: 5, duration: 300 }}
								class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-xl shadow-lg ring-1 ring-gray-900/5 backdrop-blur-sm dark:bg-zinc-950 dark:ring-zinc-400/15"
							>
								<div class="p-2">
									{#each nav.subnavs as subnav}
										<div
											class="group relative flex items-center gap-x-6 rounded-lg px-4 py-2 text-sm/6 hover:bg-gray-50 dark:hover:bg-zinc-900"
										>
											<div class="flex-auto">
												<a
													href={subnav.url}
													onclick={() => (nav.isOpen = false)}
													class="block font-semibold text-primary"
												>
													{subnav.name}
													<span class="absolute inset-0"></span>
												</a>
												{#if subnav?.desc}
													<p class="mt-1 text-gray-600">{subnav.desc}</p>
												{/if}
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{:else}
					<a href={nav.url} class="text-sm/6 font-semibold text-primary">{nav.name}</a>
				{/if}
			{/each}
		</div>
		<div class="hidden lg:flex lg:flex-1 lg:justify-end">
			<Button size='sm' variant="outline">Guide</Button>
		</div>
	</nav>
	<!-- Mobile menu, show/hide based on menu open state. -->
	<div class="lg:hidden" role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0 z-10"></div>
		<div
			class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
		>
			<div class="flex items-center justify-between">
				<a href="#" class="-m-1.5 p-1.5">
					<span class="sr-only">Your Company</span>
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
						alt=""
					/>
				</a>
				<button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
					<span class="sr-only">Close menu</span>
					<svg
						class="size-6"
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
			<div class="mt-6 flow-root">
				<div class="-my-6 divide-y divide-gray-500/10">
					<div class="space-y-2 py-6">
						<div class="-mx-3">
							<button
								type="button"
								class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
								aria-controls="disclosure-1"
								aria-expanded="false"
								
							>
								Product
								<!--
                    Expand/collapse icon, toggle classes based on menu open state.
  
                    Open: "rotate-180", Closed: ""
                  -->
								<svg
									class="size-5 flex-none"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										fill-rule="evenodd"
										d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
							<!-- 'Product' sub-menu, show/hide based on menu state. -->
							<div class="mt-2 space-y-2" id="disclosure-1">
								<a
									href="#"
									class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
									>Analytics</a
								>
								<a
									href="#"
									class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
									>Engagement</a
								>
								<a
									href="#"
									class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
									>Security</a
								>
								<a
									href="#"
									class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
									>Integrations</a
								>
								<a
									href="#"
									class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
									>Automations</a
								>
								<a
									href="#"
									class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
									>Watch demo</a
								>
								<a
									href="#"
									class="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
									>Contact sales</a
								>
							</div>
						</div>
						<a
							href="#"
							class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
							>Features</a
						>
						<a
							href="#"
							class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
							>Marketplace</a
						>
						<a
							href="#"
							class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
							>Company</a
						>
					</div>
					<div class="py-6">
						<a
							href="#"
							class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
							>Log in</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>
