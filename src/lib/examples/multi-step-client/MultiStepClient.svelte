<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { schemaStep1, schemaStep2, schemaStep3 } from '$lib/examples/multi-step-client/schema';
	import { page } from '$app/state';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from '../../../routes/docs/multi-step-client/$types';

	let { data }: { data: PageData } = $props();

	let steps = [zod(schemaStep1), zod(schemaStep2), zod(schemaStep3)];
	let step = $state(1);
	let opt = $derived(steps[step - 1]);

	let { form, errors, enhance, message, validateForm } = superForm(data.form, {
		// No need for Hidden field
		dataType: 'json',
		// svelte-ignore state_referenced_locally
		validators: opt,
		async onSubmit({ cancel }) {
			// if on last step, make a normal request
			if (step === steps.length) {
				return;
			} else cancel();

			// Make a manual client-side validation, since we have cancelled
			let result = await validateForm({ update: true, schema: opt });
			if (result.valid) {
				step = step + 1;
			}
		},
		async onUpdated({ form }) {
			if (form.valid) step = 1;
		}
	});
</script>

<div
	class="flex min-h-[70vh] items-center justify-center border border-muted-foreground/70 dark:bg-zinc-900/60"
>
	<form method="POST" use:enhance class="flex min-w-56 flex-col justify-center gap-2">
		{#if $message}
			<div class={[page.status >= 200 && 'text-emerald-400', page.status >= 400 && 'text-red-400']}>
				{$message}
			</div>
		{/if}

		<h4>Step {step}</h4>
		{#if step === 1}
			<div>
				<Label for="name">Name</Label>
				<Input
					bind:value={$form.name}
					type="text"
					id="name"
					name="name"
					placeholder="Enter your name"
				/>
				{#if $errors.name}
					<span class="invalid">
						{$errors.name}
					</span>
				{/if}
			</div>
			<div>
				<Label for="email">Email</Label>
				<Input
					bind:value={$form.email}
					type="email"
					id="email"
					name="email"
					placeholder="Enter your email"
				/>
				{#if $errors.email}
					<span class="invalid">
						{$errors.email}
					</span>
				{/if}
			</div>
			<Button type="submit" size="sm" variant="secondary">Next</Button>
		{:else if step === 2}
			<div>
				<Label for="org_name">Organization Name</Label>
				<Input
					bind:value={$form.org_name}
					type="text"
					id="org_name"
					name="org_name"
					placeholder="Enter your organization name"
				/>
				{#if $errors.org_name}
					<span class="invalid">
						{$errors.org_name}
					</span>
				{/if}
			</div>
			<Button type="submit" size="sm" variant="secondary">Next</Button>
		{:else}
			<div>
				<Label for="social_twitter">Twitter</Label>
				<Input
					bind:value={$form.social_twitter}
					type="text"
					id="social_twitter"
					name="social_twitter"
					placeholder="Enter your twitter handle"
				/>
				{#if $errors.social_twitter}
					<span class="invalid">
						{$errors.social_twitter}
					</span>
				{/if}
			</div>
			<div>
				<Label for="social_github">Github</Label>
				<Input
					bind:value={$form.social_github}
					type="text"
					id="social_github"
					name="social_github"
					placeholder="Enter your github handle"
				/>
				{#if $errors.social_github}
					<span class="invalid">
						{$errors.social_github}
					</span>
				{/if}
			</div>
			<Button type="submit" size="sm" variant="secondary">Submit</Button>
		{/if}
	</form>
</div>

<style>
	.invalid{
		color: red;
		font-size: 0.75rem;
	}
</style>