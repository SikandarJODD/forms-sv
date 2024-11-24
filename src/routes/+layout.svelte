<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Navbar from '$lib/components/web/navbar/Navbar.svelte';
	let { children } = $props();
</script>

<!-- Light and Dark Mode -->
<ModeWatcher defaultMode="dark" />

<!-- Navbar -->
<Navbar />

{@render children()}
