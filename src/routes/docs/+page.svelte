<script lang="ts">
  import {
    Search,
    ArrowRight,
    Book,
    Shield,
    Zap,
    Star,
    Command,
    KeyRound,
    Settings,
    PlayCircle,
  } from "lucide-svelte";
  import { fade } from "svelte/transition";

  let { data } = $props();

  let searchQuery = $state("");
  let selectedCategories: string[] = $state([]);

  // Popular articles - could be fetched from analytics or manually curated
  const popularArticles = [
    {
      title: "Getting started with zenyx",
      slug: "gettingstarted",
      icon: PlayCircle,
      description: "Learn the basics of Zenyx",
    },
  ];

  // Filter docs based on search and categories
  let filteredDocs = $derived(data.docs.filter(
    (doc: {
      title: string;
      excerpt: string;
      tags: any[];
      category: string;
    }) => {
      const matchesSearch =
        searchQuery === "" ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags?.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(doc.category);

      return matchesSearch && matchesCategories;
    },
  ));

  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      selectedCategories = [...selectedCategories, category];
    }
  }
</script>

<div class="min-h-screen bg-black">
  <!-- Hero Section with Search -->
  <div class="relative isolate pt-14 pb-8 lg:pb-20">
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div class=""></div>
    </div>

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h1
          class="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4"
        >
          Documentation
        </h1>
        <p class="text-lg leading-8 text-zinc-400">
          Learn about Zenyx capabilities, workflows, and potential limitations
        </p>
      </div>

      <!-- Search Box -->
      <div class="mx-auto mt-8 max-w-2xl">
        <div class="relative group">
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search documentation..."
            class="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 pl-12
                     text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500
                     transition-colors backdrop-blur-sm group-hover:border-zinc-700"
          />
          <Search size={20} class="absolute left-4 top-4 text-zinc-500" />
          <div
            class="hidden lg:flex absolute right-4 top-3.5 items-center gap-2"
          >
            <kbd
              class="px-2 py-1 text-xs rounded bg-zinc-800 text-zinc-400 border border-zinc-700"
            >
              ⌘
            </kbd>
            <kbd
              class="px-2 py-1 text-xs rounded bg-zinc-800 text-zinc-400 border border-zinc-700"
            >
              K
            </kbd>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
    <!-- Popular Articles Grid -->
    <div class="mb-16">
      <h2 class="text-xl font-semibold text-white mb-6">Popular Articles</h2>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {#each popularArticles as article}
          <a
            href="/docs/{article.slug}"
            class="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50
                     backdrop-blur-sm p-6 hover:border-zinc-700 transition-colors"
          >
            <div class="p-2 rounded-lg bg-yellow-500/10 w-fit mb-4">
              <article.icon
                size={20}
                class="text-yellow-500"
              />
            </div>
            <h3
              class="text-lg font-medium text-white group-hover:text-yellow-z transition-colors"
            >
              {article.title}
            </h3>
            <p class="mt-2 text-sm text-zinc-400">
              {article.description}
            </p>
            <ArrowRight
              size={16}
              class="absolute bottom-6 right-6 text-zinc-600 group-hover:text-yellow-400 
                       transition-colors"
            />
          </a>
        {/each}
      </div>
    </div>

    <!-- Documentation Grid -->
    {#if filteredDocs.length > 0}
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3" in:fade>
        {#each filteredDocs as doc}
          <a
            href="/docs/{doc.slug}"
            class="group relative flex flex-col justify-between rounded-xl border border-zinc-800
                     bg-zinc-900/50 backdrop-blur-sm p-6 hover:border-zinc-700 transition-colors"
          >
            {#if doc.image}
              <img
                src={doc.image}
                alt={doc.title}
                class="mb-4 rounded-lg h-32 w-full object-cover"
              />
            {/if}
            <div>
              {#if doc.category}
                <span class="text-xs font-medium text-yellow-z mb-2 block">
                  {doc.category}
                </span>
              {/if}
              <h3
                class="text-lg font-medium text-white group-hover:text-yellow-500
                           transition-colors mb-2"
              >
                {doc.title}
              </h3>
              {#if doc.excerpt}
                <p class="text-sm text-zinc-400 line-clamp-2">
                  {doc.excerpt}
                </p>
              {/if}
            </div>
            {#if doc.tags?.length}
              <div class="mt-4 flex flex-wrap gap-2">
                {#each doc.tags as tag}
                  <span
                    class="px-2 py-0.5 text-xs rounded-full bg-yellow-500/10 text-yellow-500"
                  >
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}
            <ArrowRight
              size={16}
              class="absolute bottom-6 right-6 text-zinc-600 group-hover:text-yellow-500
                       transition-colors"
            />
          </a>
        {/each}
      </div>
    {:else}
      <div class="text-center py-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full
                      bg-zinc-900/50 mb-4"
        >
          <Search size={24} class="text-zinc-500" />
        </div>
        <h3 class="text-lg font-medium text-white mb-2">No results found</h3>
        <p class="text-zinc-400">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    {/if}
  </div>
</div>

