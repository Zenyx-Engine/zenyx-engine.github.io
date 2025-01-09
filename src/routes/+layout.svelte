<script>
  import Footer from '$lib/components/layout/Footer.svelte';
  import NavBar from '$lib/components/layout/NavBar.svelte';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import '../app.css';
  export let data;

  let jsEnabled = false;

  onMount(() => {
    jsEnabled = true;
  });
</script>

<noscript>
  <style>
    .no-js-animation {
      opacity: 1 !important;
      transition: none !important;
    }
  </style>
</noscript>

<NavBar />

{#if jsEnabled}
  {#key data.pathname}
    <div in:fade={{ duration: 100, delay: 0 }} out:fade={{ duration: 100 }}>
      <slot />
    </div>
  {/key}
{:else}
  <div class="no-js-animation">
    <slot />
  </div>
{/if}

<Footer />
