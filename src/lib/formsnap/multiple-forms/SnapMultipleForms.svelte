<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { PageData } from '../../../routes/formsnap/multiple-forms/$types';
	import SuperDebug, { superForm } from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	// For Register Form
	let form = superForm(data.registerForm, {
		resetForm: true
	});
	let { form: formData, errors, enhance, message } = form;

	// For Login Form
	let loginForm = superForm(data.loginForm, {
		resetForm: true
	});
	let {
		form: login,
		errors: loginErrors,
		enhance: loginEnhance,
		message: loginMessage
	} = loginForm;

	// Formsnap
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';
</script>

<div class="flex min-h-[60vh] items-center justify-center gap-10 border border-muted-foreground/50 dark:bg-zinc-900/50">
	<!-- Register Form -->
	<form
		action="?/register"
		method="POST"
		use:enhance
		class="min-h-80 min-w-80 space-y-2 border border-dashed border-muted-foreground/50 bg-zinc-900/40 p-6 *:space-y-1"
	>
		{#if $message}
			<p class="text-xs text-green-500">{$message}</p>
		{/if}
		<div>
			<Field {form} name="email">
				<Control>
					{#snippet children({ props })}
						<Label>Email</Label>
						<Input
							{...props}
							type="email"
							name="email"
							placeholder="Type your Email"
							bind:value={$formData.email}
						/>
					{/snippet}
				</Control>
				<FieldErrors  />
			</Field>
		</div>
		<div>
			<Field {form} name="password">
				<Control>
					{#snippet children({ props })}
						<Label>Email</Label>
						<Input
							{...props}
							type="password"
							name="password"
							placeholder="Type your Password"
							bind:value={$formData.password}
						/>
					{/snippet}
				</Control>
				<FieldErrors class='text-sm text-destructive' />
			</Field>
		</div>
		<div>
			<Field {form} name="confirm_password">
				<Control>
					{#snippet children({ props })}
						<Label>Email</Label>
						<Input
							{...props}
							type="password"
							name="confirm_password"
							placeholder="Type your Confirm Password"
							bind:value={$formData.confirm_password}
						/>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
		</div>

		<div>
			<Button size="sm" type="submit">Register</Button>
		</div>
	</form>

	<!-- Login Form -->
	<form
		action="?/login"
		method="POST"
		use:loginEnhance
		class="min-h-80 min-w-80 space-y-2 border border-dashed border-muted-foreground/50 bg-zinc-900/40 p-6 *:space-y-1"
	>
		{#if $loginMessage}
			<p class="text-xs text-green-500">{$loginMessage}</p>
		{/if}
		<div>
			<Field form={loginForm} name="email">
				<Control>
					{#snippet children({ props })}
						<Label for="email">Email</Label>
						<Input
							{...props}
							type="email"
							name="email"
							placeholder="Type your Email"
							bind:value={$login.email}
						/>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
		</div>
		<div>
			<Field form={loginForm} name="password">
				<Control>
					{#snippet children({ props })}
						<Label for="email">Password</Label>
						<Input
							{...props}
							type="password"
							name="password"
							placeholder="Type your Password"
							bind:value={$login.password}
						/>
					{/snippet}
				</Control>
				<FieldErrors />
			</Field>
		</div>

		<div>
			<Button size="sm" type="submit">Login</Button>
		</div>
	</form>
</div>

<!-- <SuperDebug data={$formData} /> -->
