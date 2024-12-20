<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/stores';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { PageData } from '../../../routes/docs/crud/users/[[id]]/$types';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	let { form, enhance, errors, constraints, delayed, reset, message } = superForm(data.form, {
		resetForm: false,
		onUpdated() {
			if (!data.form.data.id) {
				reset({ keepMessage: true });
			}
		}
	});
</script>

<div
	class="flex min-h-[60vh] flex-col items-center justify-center border border-muted-foreground/70 dark:bg-zinc-900/60"
>
	{#if $form.id}
		<Button size="sm" href="/docs/crud/users" variant="secondary">Create New</Button>
	{/if}
	<div class="mt-4 w-fit dark:bg-zinc-900">
		{#each data.users as user}
			<a class="flex items-center space-x-2 border p-2" href="/docs/crud/users/{user.id}">
				<span>
					{user.name}
				</span>
				<span>
					{user.email}
				</span>
				<span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-square-arrow-out-up-right text-muted-foreground"
						><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /><path
							d="m21 3-9 9"
						/><path d="M15 3h6v6" /></svg
					>
				</span>
			</a>
		{/each}
	</div>
	{#if $message}
		<h4 class="message mt-2" class:success={$page.status < 400} class:error={$page.status >= 400}>
			{$message}
		</h4>
	{/if}
	<div class="mt-4">
		<form method="post" use:enhance class="w-64 space-y-2">
			<!-- Hidden Input for ID -->
			<input type="hidden" name="id" id="id" bind:value={$form.id} />
			<div>
				<Label for="name">Name</Label>
				<Input
					name="name"
					id="name"
					type="text"
					placeholder="Type your name"
					aria-invalid={$errors.name ? 'true' : undefined}
					bind:value={$form.name}
					{...$constraints.name}
				/>
				{#if $errors.name}
					<span class="invalid">{$errors.name}</span>
				{/if}
			</div>
			<div>
				<Label for="email">Email</Label>
				<Input
					name="email"
					id="email"
					type="email"
					placeholder="Type your email"
					aria-invalid={$errors.email ? 'true' : undefined}
					bind:value={$form.email}
					{...$constraints.email}
				/>
				{#if $errors.email}
					<span class="invalid">{$errors.email}</span>
				{/if}
			</div>
			<div>
				<Button type="submit" size="sm" variant="secondary">Submit</Button>
				{#if $form.id}
					<Button type="submit" name="delete" size="sm" variant="secondary">Delete</Button>
				{/if}
			</div>
		</form>
	</div>
</div>

<style>
	.success {
		color: rgb(142, 253, 142);
	}
	.error {
		color: rgb(255, 45, 45);
	}
</style>
