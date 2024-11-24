<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox/index';
	let { form } = $props();
	let errors = $derived(form?.errors);
	let values = $derived(form?.data);
	$inspect(values);
</script>

<div class="flex min-h-svh items-center justify-center">
	<form method="post" class="flex min-w-56 flex-col justify-center gap-4" use:enhance>
		<div class="space-y-1">
			<Label for="name">Name</Label>
			<Input
				type="text"
				name="name"
				id="name"
				placeholder="Name"
				value={values?.name ?? ''}
				class={errors?.name ? 'border-red-500' : ''}
			/>
			{#if errors?.name}
				<span>
					<p class="text-sm text-red-500">{errors.name[0]}</p>
				</span>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="email">Email</Label>
			<Input
				type="email"
				name="email"
				id="email"
				placeholder="Enter your Email"
				value={values?.email ?? ''}
			/>
			{#if errors?.email}
				<span>
					<p class="text-sm text-red-500">{errors.email[0]}</p>
				</span>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="password">Password</Label>
			<Input type='password' name="password" id="password" placeholder="Password" />
			{#if errors?.password}
				<span>
					<p class="text-sm text-red-500">{errors.password[0]}</p>
				</span>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="confirm_password">Confirm Password</Label>
			<Input
				type='password'
				name="confirm_password"
				id="confirm_password"
				placeholder="Confirm Password"
			/>
			{#if errors?.confirm_password}
				<span>
					<p class="text-sm text-red-500">{errors.confirm_password[0]}</p>
				</span>
			{/if}
		</div>
		<div>
			<div class="items-top flex space-x-2">
				<Checkbox id="terms" name="terms" checked={values?.terms === 'on' ? true : false} />
				<div class="grid gap-1.5 leading-none">
					<Label
						for="terms"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Accept terms and conditions
					</Label>
					<p class="text-sm text-muted-foreground">
						You agree to our Terms of Service and Privacy Policy.
					</p>
				</div>
			</div>
			{#if errors?.terms}
				<span>
					<p class="text-sm text-red-500">{errors.terms[0]}</p>
				</span>
			{/if}
		</div>
		<div>
			<Button type="submit">Submit</Button>
		</div>
	</form>
</div>
