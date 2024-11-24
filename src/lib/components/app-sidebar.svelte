<script lang="ts" module>
	// sample data
	type NavItem = {
		title: string;
		url: string;
		isActive?: boolean;
		isCommingSoon?: boolean;
		items?: NavItem[];
	};
	type Data = {
		versions: string[];
		navMain: NavItem[];
	};

	let data: Data = {
		versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
		navMain: [
			{
				title: 'Getting Started',
				url: '#',
				items: [
					{
						title: 'Home',
						url: '/'
					}
				]
			},
			{
				title: 'Superforms Examples',
				url: '#',
				items: [
					{
						title: 'Svelte + ZOD Validation',
						url: '/docs/svelte-zod'
					},
					{
						title: 'Client Side Validation',
						url: '/docs/superform'
					},
					{
						title: 'Client & Server',
						url: '/docs/client-server'
					},
					{
						title: 'Files Upload ',
						url: '/docs/image-validation'
					},
					{
						title: 'Debounce Username',
						url: '/docs/debounce-username'
					},
					{
						title: 'Superforms CRUD',
						url: '#',
						isCommingSoon: true
					},
					{
						title: 'Nested Data',
						url: '#',
						isCommingSoon: true
					},
					{
						title: 'Custom Errors',
						url: '#',
						isCommingSoon: true
					},
					{
						title: 'Loading Spinner',
						url: '#',
						isCommingSoon: true
					},
					{
						title: 'Multiple Forms',
						url: '#',
						isCommingSoon: true
					}
				]
			}
			// {
			// 	title: 'FormSnap Examples',
			// 	url: '#',
			// 	items: [
			// 		{
			// 			title: 'Basic Example',
			// 			url: '#'
			// 		},
			// 		{
			// 			title: 'Files Upload',
			// 			url: '#'
			// 		},
			// 		{
			// 			title: 'Username Debounce',
			// 			url: '#'
			// 		}
			// 	]
			// }
		]
	};
</script>

<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Header class="bg-background">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-circle-slash size-[18px]"
									><circle cx="12" cy="12" r="10" /><line x1="9" x2="15" y1="15" y2="9" /></svg
								>
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-semibold">Forms SV</span>
								<span class="text-muted-foreground">superforms exmaples</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content class="bg-background">
		<Sidebar.Group>
			<Sidebar.Menu>
				{#each data.navMain as groupItem (groupItem.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="font-medium">
							{#snippet child({ props })}
								<a href={groupItem.url} {...props}>
									{groupItem.title}
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if groupItem.items?.length}
							<Sidebar.MenuSub>
								{#each groupItem.items as item (item.title)}
									<Sidebar.MenuSubItem>
										{#if item.isCommingSoon}
											<Sidebar.MenuSubButton class='text-muted-foreground'>
												{#snippet child({ props })}
													<span {...props}>{item.title}</span>
												{/snippet}
											</Sidebar.MenuSubButton>
										{:else}
											<Sidebar.MenuSubButton isActive={item?.isActive}>
												{#snippet child({ props })}
													<a href={item.url} {...props}>{item.title}</a>
												{/snippet}
											</Sidebar.MenuSubButton>
										{/if}
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						{/if}
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
