<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { userSchema } from '$lib/formsnap/simple/schema';
	import SuperDebug from 'sveltekit-superforms';

	// FormSnap
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from '../../../routes/formsnap/simple/$types';

	let {
		data
	}: {
		data: PageData;
	} = $props();
	let form = superForm(data.form, {
		validators: zodClient(userSchema)
	});
	let { form: formData, enhance, message } = form;
</script>

<div class="flex min-h-[70vh] items-center justify-center border border-muted-foreground/50 dark:bg-zinc-900/50">
	<form action="?/userdetails" method="post" use:enhance class="min-w-64 space-y-2">
		{#if $message}
			<span class="text-emerald-400">
				{$message}
			</span>
		{/if}
		<div>
			<Field {form} name="name">
				<Control>
					{#snippet children({ props })}
						<Label>Name</Label>
						<Input
							{...props}
							type="text"
							placeholder="Enter your name"
							bind:value={$formData.name}
						/>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
		</div>
		<div>
			<Field {form} name="username">
				<Control>
					{#snippet children({ props })}
						<Label>Username</Label>
						<Input
							{...props}
							placeholder="Enter your username"
							type="text"
							bind:value={$formData.username}
						/>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
		</div>
		<div>
			<Field {form} name="email">
				<Control>
					{#snippet children({ props })}
						<Label>Email</Label>
						<Input
							{...props}
							placeholder="Enter your email"
							type="email"
							bind:value={$formData.email}
						/>
					{/snippet}
				</Control>

				<FieldErrors />
			</Field>
		</div>
		<div>
			<Button size="sm" type="submit">Submit</Button>
		</div>
	</form>
</div>

<!-- <SuperDebug data={$formData} /> -->
