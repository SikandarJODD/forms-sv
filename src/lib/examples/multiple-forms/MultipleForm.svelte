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

<div
	class="flex items-center justify-center flex-wrap gap-10 border border-muted-foreground/70 p-4 dark:bg-zinc-900/60 md:min-h-[70vh] md:p-0"
>
	<!-- Register Form -->
	<form
		action="?/register"
		method="POST"
		use:enhance
		class="min-h-80 w-full space-y-2 border border-dashed border-muted-foreground/50 bg-zinc-900/40 p-6 *:space-y-1 md:w-80"
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
			<Button size="sm" variant="secondary" type="submit">Register</Button>
		</div>
	</form>

	<!-- Login Form -->
	<form
		action="?/login"
		method="POST"
		use:loginEnhance
		class="min-h-80 w-full space-y-2 border border-dashed border-muted-foreground/50 bg-zinc-900/40 p-6 *:space-y-1 md:w-80"
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
			<Button size="sm" variant="secondary" type="submit">Login</Button>
		</div>
	</form>
</div>
