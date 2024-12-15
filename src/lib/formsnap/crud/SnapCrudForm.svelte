<script lang="ts">
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import Button from '$lib/components/ui/button/button.svelte';
	import { page } from '$app/stores';
	import Input from '$lib/components/ui/input/input.svelte';

	// formsnap
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';
	import type { PageData } from '../../../routes/formsnap/crud/users/[[id]]/$types';
	import { zod } from 'sveltekit-superforms/adapters';
	import { userSchema } from '$lib/examples/crud/user';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	let crudSchema = userSchema.extend({
		id: userSchema.shape.id.optional()
	});
	let formData = superForm(data.form, {
		validators: zod(crudSchema),
		resetForm: false,
		onUpdated() {
			if (!data.form.data.id) {
				reset({ keepMessage: true });
			}
		}
	});

	let { form, enhance, reset, message, constraints } = formData;
	let errorClass = 'text-sm text-red-500';
</script>

<h1>Superforms CRUD</h1>
<div class="users">
	{#if $form.id}
		<Button size="sm" href="/formsnap/crud/users" variant="secondary">Create New</Button>
	{/if}
	<div class="mt-4 w-fit dark:bg-zinc-900">
		{#each data.users as user}
			<a class="flex items-center space-x-2 border p-2" href="/formsnap/crud/users/{user.id}">
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
				<Field form={formData} name="name">
					<Control>
						{#snippet children({ props })}
							<Label>Name</Label>
							<Input
								{...props}
								{...$constraints.name}
								type="text"
								bind:value={$form.name}
								placeholder="Type your name"
							/>
						{/snippet}
					</Control>
					<FieldErrors class={errorClass} />
				</Field>
			</div>
			<div>
				<Field form={formData} name="email">
					<Control>
						{#snippet children({ props })}
							<Label>Email</Label>
							<Input
								{...props}
								type="email"
								placeholder="Type your email"
								bind:value={$form.email}
							/>
						{/snippet}
					</Control>
					<FieldErrors class={errorClass} />
				</Field>
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

<!-- <SuperDebug data={$form} /> -->

<style>
	.success {
		color: rgb(142, 253, 142);
	}
	.error {
		color: rgb(255, 45, 45);
	}
</style>
