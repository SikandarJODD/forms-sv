<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	import SuperDebug, { fileProxy, filesFieldProxy, superForm } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from '../../../routes/formsnap/image-validation/$types';
	import { image_schema } from './schema';

	// formsnap
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';

	let {
		data
	}: {
		data: PageData;
	} = $props();
	let errorClass = 'text-sm text-red-500';

	let form = superForm(data.form, {
		validators: zodClient(image_schema),
		resetForm: true
	});
	let { form: formData, message, enhance } = form;
	let file = fileProxy(formData, 'image');

	let files = filesFieldProxy(form, 'images');
	let { values, valueErrors, errors: fileErrors } = files;
</script>

<div class="flex min-h-svh flex-col items-center justify-center">
	{#if $message}
		<p class="text-emerald-400">{$message}</p>
	{/if}
	<form method="post" use:enhance class="min-w-80 space-y-2" enctype="multipart/form-data">
		<div class="space-y-1">
			<Field {form} name="email">
				<Control>
					{#snippet children({ props })}
						<Label for="email">Email</Label>
						<Input
							{...props}
							type="email"
							id="email"
							name="email"
							placeholder="Enter your email"
							bind:value={$formData.email}
						/>
					{/snippet}
				</Control>
				<FieldErrors class={errorClass} />
			</Field>
		</div>
		<div>
			<Field {form} name="image">
				<Control>
					{#snippet children({ props })}
						<Label for="image">Image</Label>
						<input
							name="image"
							class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							accept="image/png, image/jpeg"
							id="image"
							type="file"
							bind:files={$file}
						/>
					{/snippet}
				</Control>
				<FieldErrors class={errorClass} />
			</Field>
		</div>
		<div>
			<Field {form} name="images">
				<Control>
					{#snippet children({ props })}
						<Label for="images">Images</Label>
						<input
							{...props}
							class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							accept="image/png, image/jpeg"
							name="images"
							type="file"
							id="images"
							multiple
							oninput={(e) => {
								let file = e.currentTarget.files as FileList;
								$formData.images = Array.from(file);
							}}
						/>
					{/snippet}
				</Control>
				<FieldErrors class={errorClass} />
				<div class='flex flex-col gap-1'>
					{#each $valueErrors as error, i}
						{#if error}
							<span class={errorClass}>Image {i + 1}: {error}</span>
						{/if}
					{/each}
					{#if $fileErrors}
						{#each $fileErrors as error, i}
							{#if error}
								<span class={errorClass}>Image {i + 1}: {error}</span>
							{/if}
						{/each}
					{/if}
				</div>
			</Field>
			<!-- {#each $valueErrors as error, i}
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
			{/if} -->
		</div>
		<div>
			<Button type="submit">Submit</Button>
		</div>
	</form>
</div>
<SuperDebug data={$formData} />
