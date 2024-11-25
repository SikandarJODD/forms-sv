<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from '../../../routes/docs/multiple-forms/$types';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	// Register form
	let { form, enhance, errors, message } = superForm(data.registerForm, {
		resetForm: true
	});

	// Login form
	let {
		form: loginForm,
		errors: loginErrors,
		message: loginMessage,
		enhance: loginEnhance
	} = superForm(data.loginForm, {
		resetForm: true
	});
</script>

<div class="flex min-h-[80vh] items-center justify-center gap-10">
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
			<Label for="email">Email</Label>
			<Input type="email" name="email" placeholder="Type your Email" bind:value={$form.email} />
			{#if $errors.email}
				<p class="text-xs text-red-500">{$errors.email}</p>
			{/if}
		</div>
		<div>
			<Label for="password">Password</Label>
			<Input
				type="password"
				name="password"
				placeholder="Type your Password"
				bind:value={$form.password}
			/>
			{#if $errors.password}
				<p class="text-xs text-red-500">{$errors.password}</p>
			{/if}
		</div>
		<div>
			<Label for="confirmPassword">Confirm Password</Label>
			<Input
				type="password"
				name="confirmPassword"
				placeholder="Confirm your Password"
				bind:value={$form.confirmPassword}
			/>
			{#if $errors.confirmPassword}
				<p class="text-xs text-red-500">{$errors.confirmPassword}</p>
			{/if}
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
			<Label for="email">Email</Label>
			<Input
				type="email"
				name="email"
				placeholder="Type your Email"
				bind:value={$loginForm.email}
			/>
			{#if $loginErrors.email}
				<p class="text-xs text-red-500">{$loginErrors.email}</p>
			{/if}
		</div>
		<div>
			<Label for="password">Password</Label>
			<Input
				type="password"
				name="password"
				placeholder="Type your Password"
				bind:value={$loginForm.password}
			/>
			{#if $loginErrors.password}
				<p class="text-xs text-red-500">{$loginErrors.password}</p>
			{/if}
		</div>
		<div>
			<Button size="sm" type="submit">Login</Button>
		</div>
	</form>
</div>
