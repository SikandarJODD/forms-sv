<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { userSchema } from '$lib/formsnap/simple/schema';
	import type { PageData } from './$types';
	import SuperDebug from 'sveltekit-superforms';

	// FormSnap
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';
	import { Input } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';

	let {
		data
	}: {
		data: PageData;
	} = $props();
	let form = superForm(data.form, {
		validators: zodClient(userSchema)
	});
	let { form: formData, enhance } = form;
</script>

<div class="flex min-h-[70vh] items-center justify-center">
	<form action="?/userdetails" method="post" use:enhance class="min-w-64">
		<Field {form} name="name">
			<Control let:attrs>
				<Label>Name</Label>
				<Input {...attrs} type="text" placeholder="Enter your name" bind:value={$formData.name} />
			</Control>
			<FieldErrors />
		</Field>

		<Field {form} name="username">
			<Control let:attrs>
				<Label>Username</Label>
				<Input
					{...attrs}
					placeholder="Enter your username"
					type="text"
					bind:value={$formData.username}
				/>
			</Control>
			<FieldErrors />
		</Field>

		<Field {form} name="email">
			<Control let:attrs>
				<Label>Email</Label>
				<Input
					{...attrs}
					placeholder="Enter your email"
					type="email"
					bind:value={$formData.email}
				/>
			</Control>
			<FieldErrors />
		</Field>

		<Field {form} name="desc">
			<Control let:attrs>
				<Label>Bio</Label>
				<Input {...attrs} placeholder="Enter your bio" type="text" bind:value={$formData.desc} />
			</Control>
			<FieldErrors />
		</Field>
		<div class="mt-2">
			<Button size="sm" type="submit">Submit</Button>
		</div>
	</form>
</div>

<SuperDebug data={$formData} />
