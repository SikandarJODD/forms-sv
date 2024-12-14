<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let navs = [
		{
			name: 'Home',
			url: '/'
		},
		{
			name: 'Superforms',
			url: '/docs'
		},
		{
			name: 'FormSnap',
			url: '/formsnap'
		}
		// {
		// 	name: 'Docs',
		// 	isOpen: false,
		// 	subnavs: [
		// 		{
		// 			name: 'Svelte with Zod',
		// 			url: '/docs/svelte-zod',
		// 			desc: 'This Example shows how to use Zod with Svelte.'
		// 		},
		// 		{
		// 			name: 'Superform Client',
		// 			url: '/docs/superform',
		// 			desc: 'Svelte + ZOD + Sveltekit-Superforms - Client Side'
		// 		},
		// 		{
		// 			name: 'Client-Server',
		// 			url: '/docs/client-server',
		// 			desc: 'Client and Server Side Validations'
		// 		},
		// 		{
		// 			name: 'Image and Images Validation',
		// 			url: '/docs/image-validation',
		// 			desc: 'Image and Images Validation using Zod'
		// 		},
		// 		{
		// 			name: 'Debounce Username',
		// 			url: '/docs/debounce-username',
		// 			desc: 'Debounce Username using throttle-debounce'
		// 		},
		// 		{
		// 			name: 'CRUD Superforms',
		// 			url: '/docs/debounce-username',
		// 			desc: 'Fully Functional CRUD Superforms + ZOD'
		// 		}
		// 	]
		// }
	];
</script>

<nav class="border-b bg-background">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<a href='/' class="shrink-0" aria-label="home">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.4"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-square-m"
						><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 16V8l4 4 4-4v8" /></svg
					>
				</a>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						{#each navs as nav}
							<Button variant="ghost" href={nav.url}>{nav.name}</Button>
						{/each}
					</div>
				</div>
			</div>
			<div class="hidden sm:ml-6 sm:block">
				<div class="flex items-center gap-1">
					<Button size="icon" variant="ghost"
						><svg
							viewBox="0 0 256 250"
							width="256"
							height="250"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="xMidYMid"
						>
							<path
								d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z"
							/>
						</svg></Button
					>
					<Button size="icon" variant="ghost"
						><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="currentColor"
							><path
								d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
							/></svg
						></Button
					>
					<ThemeSwitch />
				</div>
			</div>
			<div class="-mr-2 flex sm:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					<!--
			  Icon when menu is closed.
  
			  Menu open: "hidden", Menu closed: "block"
			-->
					<svg
						class="block size-6"
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
					<!--
			  Icon when menu is open.
  
			  Menu open: "block", Menu closed: "hidden"
			-->
					<svg
						class="hidden size-6"
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
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="sm:hidden" id="mobile-menu">
		<div class="space-y-1 px-2 pb-3 pt-2">
			<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
			<a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
				>Dashboard</a
			>
			<a
				href="#"
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>Team</a
			>
			<a
				href="#"
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>Projects</a
			>
			<a
				href="#"
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>Calendar</a
			>
		</div>
		<div class="border-t border-gray-700 pb-3 pt-4">
			<div class="flex items-center px-5">
				<div class="shrink-0">
					<img
						class="size-10 rounded-full"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
				</div>
				<div class="ml-3">
					<div class="text-base font-medium text-white">Tom Cook</div>
					<div class="text-sm font-medium text-gray-400">tom@example.com</div>
				</div>
				<button
					type="button"
					class="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
				>
					<span class="absolute -inset-1.5"></span>
					<span class="sr-only">View notifications</span>
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
							d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
						/>
					</svg>
				</button>
			</div>
			<div class="mt-3 space-y-1 px-2">
				<a
					href="#"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
					>Your Profile</a
				>
				<a
					href="#"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
					>Settings</a
				>
				<a
					href="#"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
					>Sign out</a
				>
			</div>
		</div>
	</div>
</nav>
