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
	let { form, message, errors, constraints, enhance } = superForm(data.form, {
		validators: zod(schema)
	});
</script>

<div class="flex min-h-svh flex-col items-center justify-center">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
	<form method="post" use:enhance class="min-w-80 space-y-2">
		<div class="space-y-1">
			<Label for="name">Name</Label>
			<Input type="text" id="name" name="name" bind:value={$form.name}  />
			{#if $errors.name}
				<p class="text-sm text-red-500">{$errors.name}</p>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="email">Email</Label>
			<Input type="email" id="email" name="email" bind:value={$form.email} />
			{#if $errors.email}
				<p class="text-sm text-red-500">{$errors.email}</p>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="age">Age</Label>
			<Input type='text' id="age" name="age" bind:value={$form.age} />
			{#if $errors.age}
				<p class="text-sm text-red-500">{$errors.age}</p>
			{/if}
		</div>

		<div>
			<Button type="submit">Submit</Button>
		</div>
	</form>
</div>
