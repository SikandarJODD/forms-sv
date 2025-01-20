<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { page } from '$app/state';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from '../../../routes/docs/multi-step-server/$types';

	let { data }: { data: PageData } = $props();
	let { form, formId, errors, message, capture, restore } = superForm(data.form, {
		resetForm: false
	});

	// Snapshots take care of navigating back
	export const snapshot = { capture, restore };

	let step = $derived($message?.step ?? 1);
	$inspect(step, 'step');
</script>

<div
	class="flex min-h-[70vh] items-center justify-center border border-muted-foreground/70 dark:bg-zinc-900/60"
>
	<!-- Form -->
	<form method="POST" class="flex min-w-56 flex-col justify-center gap-2">
		{#if $message?.text}
			<!-- eslint-disable-next-line svelte/valid-compile -->
			<div class={[page.status >= 200 && 'text-emerald-400', page.status >= 400 && 'text-red-400']}>
				{$message.text}
			</div>
		{/if}
		<!-- Separate step counter (not part of schema) -->
		<input type="hidden" name="step" value={step} />
		<!-- Need this, since use:enhance is not added to the form and schemas are switching between steps: -->
		<input type="hidden" name="__superform_id" bind:value={$formId} />

		{#if step === 1}
			<!-- Step 1 -->
			<div>
				<Label for="name">Name</Label>
				<Input
					type="text"
					placeholder="Enter your name"
					id="name"
					name="name"
					bind:value={$form.name}
				/>
				{#if $errors.name}
					<span class="invalid">{$errors.name}</span>
				{/if}
			</div>
			<div>
				<Label for="email">Email</Label>
				<Input
					type="email"
					placeholder="Enter your email"
					id="email"
					name="email"
					bind:value={$form.email}
				/>
				{#if $errors.email}
					<span class="invalid">{$errors.email}</span>
				{/if}
			</div>
			<Button type="submit" size="sm" variant="secondary">Next</Button>
		{:else if step === 2}
			<input type="hidden" name="name" value={$form.name} />
			<input type="hidden" name="email" value={$form.email} />
			<!-- Step 2 -->
			<div>
				<Label for="org_name">Organization</Label>
				<Input
					type="text"
					id="org_name"
					placeholder="Entery Org name"
					name="org_name"
					bind:value={$form.org_name}
				/>
				{#if $errors.org_name}
					<span class="invalid">{$errors.org_name}</span>
				{/if}
			</div>
			<Button type="submit" size="sm" variant="secondary">Next</Button>
		{:else}
			<input type="hidden" name="name" value={$form.name} />
			<input type="hidden" name="email" value={$form.email} />
			<input type="hidden" name="org_name" value={$form.org_name} />
			<!-- Step 3 -->
			<div>
				<Label for="social_twitter">Twitter</Label>
				<Input
					type="text"
					id="social_twitter"
					name="social_twitter"
					bind:value={$form.social_twitter}
					placeholder="Twitter Profile URL"
				/>
				{#if $errors.social_twitter}
					<span class="invalid">{$errors.social_twitter}</span>
				{/if}
			</div>
			<div>
				<Label for="social_github">Github</Label>
				<Input
					type="text"
					id="social_github"
					name="social_github"
					bind:value={$form.social_github}
					placeholder="Github Profile URL"
				/>
				{#if $errors.social_github}
					<span class="invalid">{$errors.social_github}</span>
				{/if}
			</div>
			<Button size="sm" type="submit" variant="secondary">Submit</Button>
		{/if}
	</form>
</div>

<style lang="postcss">
	.invalid {
		@apply text-red-500;
		font-size: 0.75rem;
	}
	.status {
		padding: 4px;
		padding-left: 8px;
		border-radius: 2px;
		font-weight: 500;
	}
</style>
