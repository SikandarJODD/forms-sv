<script>
	import ZodValidation from '$lib/examples/zod-validation/ZodValidation.svelte';
	let { form } = $props();
</script>

<ZodValidation {form} />
