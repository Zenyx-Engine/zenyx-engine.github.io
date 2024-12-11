<script lang="ts">
  import { page } from '$app/stores';
  import {
    ChevronRight,
    Search,
    Menu,
    X,
    ChevronDown
  } from 'lucide-svelte';
  import { fade, slide } from 'svelte/transition';
 
  // Define interfaces with explicit types
  interface Heading {
    text: string;
    slug: string;
    depth: number;
  }

  interface Doc {
    title: string;
    excerpt?: string;
    tags?: string[];
    category?: string;
    slug: string;
    headings?: Heading[];
  }

  interface PageData {
    docs: Doc[];
    currentDoc?: Doc;
  }
 
  export let data: PageData;
 
  let searchQuery = '';
  let isMenuOpen = false;
  let openCategories: string[] = [];
 

  $: filteredDocs = data.docs.filter((doc: Doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.excerpt ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
 
  function toggleCategory(category: string) {
    if (openCategories.includes(category)) {
      openCategories = openCategories.filter(c => c !== category);
    } else {
      openCategories = [...openCategories, category];
    }
  }
 
  // Explicitly type the reduce function
  $: docsByCategory = data.docs.reduce((acc: Record<string, Doc[]>, doc: Doc) => {
    const category = doc.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {});
</script>

<div class="min-h-screen bg-black">
  <div class="max-w-8xl mx-auto flex">
    <!-- Sidebar -->
    <aside
      class="{isMenuOpen ? 'block' : 'hidden'} lg:block lg:w-64 xl:w-72 fixed lg:sticky
             top-[73px] h-[calc(100vh-73px)] overflow-y-auto border-r border-zinc-800
             bg-black/50 backdrop-blur-sm"
    >
      <nav class="p-4 space-y-1">
        {#each Object.entries(docsByCategory) as [category, docs]}
          <div class="mb-4">
            <button
              on:click={() => toggleCategory(category)}
              class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium
                     text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              {category}
              <ChevronDown
                size={16}
                class="transform transition-transform duration-200
                       {openCategories.includes(category) ? 'rotate-180' : ''}"
              />
            </button>
           
            {#if openCategories.includes(category)}
              <div transition:slide={{ duration: 200 }} class="mt-1 ml-2">
                {#each docs as doc}
                  <a
                    href="/docs/{doc.slug}"
                    class="flex items-center px-3 py-2 text-sm rounded-lg
                           {$page.url.pathname === `/docs/${doc.slug}` ?
                             'bg-yellow-500/10 text-yellow-500' :
                             'text-zinc-400 hover:text-white hover:bg-white/5'}"
                  >
                    {doc.title}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </nav>
    </aside>
    <!-- Main content -->
    <main class="flex-1 min-w-0 py-6 lg:px-8 xl:px-12">
      <div class="px-4 sm:px-6 lg:px-0">
        <slot />
      </div>
    </main>
    <!-- Table of contents -->
    <aside class="hidden xl:block xl:w-72 xl:flex-none sticky top-[73px] h-[calc(100vh-73px)]
                  overflow-y-auto border-l border-zinc-800 bg-black/50 backdrop-blur-sm">
      <div class="px-8 py-6">
        <h3 class="text-sm font-medium text-zinc-400">On this page</h3>
        <div class="mt-4 space-y-3 text-sm">
          {#if data.currentDoc?.headings}
            {#each data.currentDoc.headings as heading}
              <a
                href="#{heading.slug}"
                style="margin-left: {(heading.depth - 1) * 12}px"
                class="block text-zinc-400 hover:text-white line-clamp-1"
              >
                {heading.text}
              </a>
            {/each}
          {/if}
        </div>
      </div>
    </aside>
  </div>
</div>