<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from '../../../routes/docs/client-server/$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';

	let {
		data
	}: {
		data: PageData;
	} = $props();
	let { form, message, errors, enhance } = superForm(data.form, {
		validators: zod(schema)
	});
</script>

<div
	class="flex min-h-[60vh] flex-col items-center justify-center border border-muted-foreground/70 dark:bg-zinc-900/60"
>
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
	<form method="post" use:enhance class="w-full md:w-80 space-y-2 p-4 lg:p-0">
		<div class="space-y-1">
			<Label for="name">Name</Label>
			<Input
				type="text"
				id="name"
				name="name"
				bind:value={$form.name}
				placeholder="Enter your name"
			/>
			{#if $errors.name}
				<p class="text-sm text-red-500">{$errors.name}</p>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="email">Email</Label>
			<Input
				type="email"
				id="email"
				name="email"
				bind:value={$form.email}
				placeholder="Enter your email"
			/>
			{#if $errors.email}
				<p class="text-sm text-red-500">{$errors.email}</p>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="age">Age</Label>
			<Input type="text" id="age" name="age" bind:value={$form.age} placeholder="Enter your age" />
			{#if $errors.age}
				<p class="text-sm text-red-500">{$errors.age}</p>
			{/if}
		</div>

		<div>
			<Button type="submit" size="sm" variant="secondary">Submit</Button>
		</div>
	</form>
</div>
