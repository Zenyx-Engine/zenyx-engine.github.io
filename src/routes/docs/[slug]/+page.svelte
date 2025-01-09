<!-- src/routes/docs/[slug]/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    
    import Markdown from '$lib/components/elements/Markdown.svelte'
    import Prism from 'prismjs';
    import 'prismjs/components/prism-python';
    import 'prismjs/components/prism-bash';
    import 'prismjs/components/prism-yaml';
    import 'prismjs/components/prism-json';
    import 'prismjs/components/prism-rust';

  let { data } = $props();
    
    // Handle markdown content rendering
    onMount(async () => {

      // You might want to add syntax highlighting here
      Prism.highlightAll();
    });
  </script>
  
  <article class="prose prose-invert prose-yellow max-w-none">
    <div class="mb-8">
      <h1 class="mb-2 text-4xl font-bold tracking-tight">{data.doc.title}</h1>
      {#if data.doc.excerpt}
        <p class="text-xl text-zinc-400">{data.doc.excerpt}</p>
      {/if}
      {#if data.doc.tags?.length}
        <div class="mt-4 flex flex-wrap gap-2">
          {#each data.doc.tags as tag}
            <span class="px-2.5 py-0.5 text-sm rounded-full bg-yellow-500/10 text-yellow-500">
              {tag}
            </span>
          {/each}
        </div>
      {/if}
    </div>
  
    <div class="markdown">
        {@html data.doc.content}
        <Markdown>
        </Markdown>
    </div>
  </article>