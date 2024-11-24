<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Navbar from '$lib/components/web/navbar/Navbar.svelte';
	import SidebarPage from '$lib/components/sidebar-page.svelte';
	let { children } = $props();
</script>

<!-- Light and Dark Mode -->
<ModeWatcher defaultMode="dark" />

<!-- Navbar -->
<!-- <Navbar /> -->
<SidebarPage>
	{@render children()}
</SidebarPage>
