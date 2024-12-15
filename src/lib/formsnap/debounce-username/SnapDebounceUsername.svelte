<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { debounce } from 'throttle-debounce';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from '../../../routes/formsnap/debounce-username/$types';

	// formsnap
	import { Field, Control, Label, Description, FieldErrors } from 'formsnap';

	let {
		data
	}: {
		data: PageData;
	} = $props();

	let debounce_form = superForm(data.form);
	let { form, errors, message, enhance } = debounce_form;

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
	let errorClass = 'text-red-500 text-sm';
</script>

<div class="flex min-h-[40vh] items-center justify-center">
	<form action="?/post" method="POST" use:enhance class="min-w-64 space-y-2">
		{#if $message}
			<p class="text-emerald-500">{$message}</p>
		{/if}
		<div class="space-y-1">
			<Field form={debounce_form} name="username">
				<Control>
					{#snippet children({ props })}
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
									class="lucide lucide-loader spinner_P7sC"
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
					{/snippet}
				</Control>
				<FieldErrors class={errorClass} />
			</Field>

			<!-- Hidden Username Input  -->
			<Input type="hidden" name="username" value={$form.username} />

			<!-- <div class="flex">
				{#if $errors.username}
					<p class="text-red-500">{$errors.username}</p>
				{/if}
			</div> -->
		</div>
		<div class="space-y-1">
			<Field form={debounce_form} name="email">
				<Control>
					{#snippet children({ props })}
						<Label for="email">Email</Label>
						<Input
							{...props}
							type="email"
							class="w-52"
							id="email"
							placeholder="email"
							name="email"
							bind:value={$form.email}
						/>
					{/snippet}
				</Control>
				<FieldErrors class={errorClass} />
			</Field>
		</div>
		<Button size="sm" type="submit">Submit</Button>
	</form>
	<form id="check" action="?/check" method="POST" use:submitEnhance></form>
</div>

<style>
	.spinner_P7sC {
		transform-origin: center;
		animation: spinner_code 0.75s infinite linear;
		/* Change the time of spiner */
	}
	@keyframes spinner_code {
		100% {
			transform: rotate(360deg);
		}
	}
</style>
