<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	import { fileProxy, filesFieldProxy, superForm } from 'sveltekit-superforms';
	import type { PageData } from '../../../routes/docs/image-validation/$types';
	import { zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema';
	let {
		data
	}: {
		data: PageData;
	} = $props();
	let { form, errors, message, enhance } = superForm(data.form, {
		validators: zod(schema),
		resetForm: true
	});
	let superform = superForm(data.form);
	let files = filesFieldProxy(superform, 'images');
	let { values, valueErrors, errors: fileErrors } = files;
	// let file = fileProxy(form, 'image');
</script>

<div class="flex min-h-[70vh] border flex-col items-center justify-center border-muted-foreground/70 dark:bg-zinc-900/60">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
	<form method="post" use:enhance class="min-w-80 space-y-2" enctype="multipart/form-data">
		<div class="space-y-1">
			<Label for="name">Name</Label>
			<Input type="text" id="name" name="name" bind:value={$form.name} placeholder='Enter your name' />
			{#if $errors.name}
				<p class="text-sm text-red-500">{$errors.name}</p>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="email">Email</Label>
			<Input type="email" id="email" name="email" bind:value={$form.email} placeholder='Enter your email' />
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
				accept="image/png, image/jpeg"
				oninput={(e) => ($form.image = e.currentTarget.files?.item(0) as File)}
			/>
			{#if $errors.image}
				<p class="text-sm text-red-500">{$errors.image}</p>
			{/if}
		</div>
		<div>
			<Label for="image">Images</Label>
			<input
				class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
				accept="image/png, image/jpeg"
				name="images"
				type="file"
				id="images"
				multiple
				oninput={(e) => {
					let file = e.currentTarget.files as FileList;
					$form.images = Array.from(file);
				}}
			/>
			{#each $valueErrors as error, i}
				{#if error}
					<li>Image {i + 1}: {error}</li>
				{/if}
			{/each}
			{#if $fileErrors}
				{#each $fileErrors as error, i}
					{#if error}
						<li>Image {i + 1}: {error}</li>
					{/if}
				{/each}
			{/if}
			{#if $errors.images?._errors}
				<p class="text-sm text-red-500">{$errors.images._errors[0]}</p>
			{/if}
			{#if $errors.images && $errors.images[0]}
				<p class="text-sm text-red-500">{$errors.images[0]}</p>
			{/if}
		</div>
		<div>
			<Button type="submit">Submit</Button>
		</div>
	</form>
</div>
