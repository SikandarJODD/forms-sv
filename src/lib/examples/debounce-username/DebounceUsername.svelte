<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from '../../../routes/docs/debounce-username/$types';
	import { debounce } from 'throttle-debounce';
	import Button from '$lib/components/ui/button/button.svelte';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	let { form, errors, message, enhance } = superForm(data.form);

	let {
		delayed,
		submit: submitCheckUsername,
		enhance: submitEnhance
	} = superForm(
		{
			username: ''
		},
		{
			invalidateAll: false,
			applyAction: false,
			multipleSubmits: 'abort',
			onSubmit({ cancel }) {
				if (!$form.username) {
					cancel();
				}
			},
			onUpdated({ form }) {
				$errors.username = form.errors.username;
			}
		}
	);

	let checkUsername = debounce(500, submitCheckUsername);
</script>

<div
	class="flex min-h-[60vh] items-center justify-center border border-muted-foreground/60 dark:bg-zinc-900/60"
>
	<form action="?/post" method="POST" use:enhance class="min-w-64 space-y-2">
		{#if $message}
			<p class="text-emerald-500">{$message}</p>
		{/if}
		<div class="space-y-1">
			<Label for="username">Username</Label>
			<div class="flex items-center gap-2">
				<Input
					form="check"
					type="text"
					id="username"
					placeholder="username"
					name="username"
					class="w-52"
					bind:value={$form.username}
					oninput={checkUsername}
				/>
				{#if $delayed}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-loader animate-spin"
						><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path
							d="m16.2 16.2 2.9 2.9"
						/><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path
							d="m4.9 4.9 2.9 2.9"
						/></svg
					>
				{:else if $errors.username}
					❌
				{:else if $form.username && 'username' in $errors}
					✅
				{/if}
			</div>

			<!-- Hidden Username Input  -->
			<Input type="hidden" name="username" value={$form.username} />

			<div class="flex">
				{#if $errors.username}
					<p class="text-red-500">{$errors.username}</p>
				{/if}
			</div>
		</div>
		<div class="space-y-1">
			<Label for="email">Email</Label>
			<Input
				type="email"
				class="w-52"
				id="email"
				placeholder="email"
				name="email"
				bind:value={$form.email}
			/>
		</div>
		<Button size="sm" variant='secondary' type="submit">Submit</Button>
	</form>
	<form id="check" action="?/check" method="POST" use:submitEnhance></form>
</div>

<style>
	.spinner_P7sC {
		transform-origin: center;
		animation: spinner_svv2 0.75s infinite linear;
	}
	@keyframes spinner_svv2 {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
