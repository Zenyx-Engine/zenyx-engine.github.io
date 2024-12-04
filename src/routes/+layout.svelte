<script>
	import Footer from '$lib/components/layout/Footer.svelte';
import NavBar from '$lib/components/layout/NavBar.svelte';
import '../app.css';
	let { children } = $props();
</script>
<NavBar />

{@render children()}
<Footer />
