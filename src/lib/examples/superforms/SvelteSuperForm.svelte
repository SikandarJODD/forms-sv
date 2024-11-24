<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from '../../../routes/superform/$types';
	let {
		data
	}: {
		data: PageData;
	} = $props();
	let { form, errors, message, constraints } = superForm(data.form);
</script>

<div class="flex min-h-svh items-center justify-center flex-col">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
	<form method="post" use:enhance class="min-w-80 space-y-2" enctype="multipart/form-data">
		<div class="space-y-1">
			<Label for="name">Name</Label>
			<Input type="text" id="name" name="name" bind:value={$form.name} />
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
		<div>
			<Label for="image">Image</Label>
			<Input
				type="file"
				id="image"
				name="image"
				accept=".png, .jpg"
				oninput={(e) => ($form.image = e.currentTarget.files?.item(0) as File)}
			/>
			{#if $errors.image}
				<p class="text-sm text-red-500">{$errors.image}</p>
			{/if}
		</div>
		<div>
			<Button type="submit">Submit</Button>
		</div>
	</form>
</div>
