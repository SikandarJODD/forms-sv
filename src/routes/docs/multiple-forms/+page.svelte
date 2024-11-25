<script lang="ts">
    import MultipleForm from '$lib/examples/multiple-forms/MultipleForm.svelte';
import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<MultipleForm {data} />