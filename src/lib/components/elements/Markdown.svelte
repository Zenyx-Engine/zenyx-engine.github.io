<script lang="ts">
  import { marked } from 'marked';
  import { onMount } from 'svelte';
  import { Copy, CheckCheck } from 'lucide-svelte';


  interface Props {
    content?: string;
  }

  let { content = '' }: Props = $props();
  let copied: boolean = false;

  // Configure marked options
  marked.setOptions({
      gfm: true,
      breaks: true,
      // headerIds: true,
      // langPrefix: 'language-'
  });

  // Custom renderer
  //@ts-ignore
  const renderer: marked.Renderer = {
      // Custom code block rendering
      code({ text, lang, escaped }: { text: string; lang?: string; escaped?: boolean }): string {
          // Safely escape quotes for the data attribute if not already escaped
          const escapedCode = escaped ? text : text.replace(/"/g, '&quot;');
          
          return `
              <div class="relative group">
                  <div class="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button class="copy-btn p-2 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg text-zinc-400 hover:text-white transition-all"
                              data-code="${escapedCode}">
                          <svg class="copy-icon w-4 h-4">
                              <use href="#copy-icon"></use>
                          </svg>
                          <svg class="check-icon hidden w-4 h-4">
                              <use href="#check-icon"></use>
                          </svg>
                      </button>
                  </div>
                  <pre class="!mt-0"><code class="language-${lang || ''}">${text}</code></pre>
              </div>
          `;
      },

      // Custom link rendering
      link({ href, title, tokens }: { href: string; title?: string; tokens: any }): string {
          return `<a href="${href}" title="${title || ''}" class="text-yellow-400 hover:text-yellow-300 hover:underline transition-colors"
                      target="_blank" rel="noopener noreferrer">${tokens.map((t: { raw: any; }) => t.raw).join('')}</a>`;
      },

      // Custom heading rendering
      heading({ tokens, depth }: { tokens: any; depth: number }): string {
          const sizes: { [key: number]: string } = {
              1: 'text-3xl',
              2: 'text-2xl',
              3: 'text-xl',
              4: 'text-lg',
              5: 'text-base',
              6: 'text-sm'
          };
          
          const text = tokens.map((t: { raw: any; }) => t.raw).join('');
          
          return `
              <h${depth} class="font-semibold ${sizes[depth]} text-white mb-4 mt-8 first:mt-0">
                  ${text}
              </h${depth}>
          `;
      }
  };

  onMount(() => {
      // Initialize code copy functionality
      const copyButtons = document.querySelectorAll('.copy-btn');
      copyButtons.forEach(button => {
          button.addEventListener('click', () => {
              // Safely access dataset and handle potential null
              const code = (button as HTMLButtonElement).dataset.code;
              
              if (code) {
                  navigator.clipboard.writeText(code);
                  
                  // Safely query for icons
                  const copyIcon = button.querySelector('.copy-icon');
                  const checkIcon = button.querySelector('.check-icon');
                  
                  if (copyIcon && checkIcon) {
                      copyIcon.classList.add('hidden');
                      checkIcon.classList.remove('hidden');
                      
                      setTimeout(() => {
                          copyIcon.classList.remove('hidden');
                          checkIcon.classList.add('hidden');
                      }, 2000);
                  }
              }
          });
      });
  });
</script>

<!-- SVG Icons -->
<svg class="hidden">
  <symbol id="copy-icon" viewBox="0 0 24 24">
      <Copy />
  </symbol>
  <symbol id="check-icon" viewBox="0 0 24 24">
      <CheckCheck />
  </symbol>
</svg>

<div class="markdown prose prose-invert max-w-none">
  {@html marked(content, { renderer })}
</div>

<style lang="postcss">
:global(.markdown) {
    :global(h1) {
        @apply text-3xl font-semibold text-white border-b border-zinc-800 pb-3;
    }

    :global(h2) {
        @apply text-2xl font-semibold text-white border-b border-zinc-800 pb-3;
    }

    :global(h3) {
        @apply text-xl font-semibold text-white border-b border-zinc-800 pb-3;
    }

    :global(h4) {
        @apply text-lg font-semibold text-white border-b border-zinc-800 pb-3;
    }

    :global(h5) {
        @apply text-base font-semibold text-white border-b border-zinc-800 pb-3;
    }

    :global(h6) {
        @apply text-sm font-semibold text-white border-b border-zinc-800 pb-3;
    }

    /* Paragraphs and spacing */
    :global(p) {
        @apply text-zinc-300 leading-relaxed mb-4;
    }

    /* Lists */
    :global(ul, ol) {
        @apply my-4 pl-6;
    }

    :global(li) {
        @apply text-zinc-300 mb-2;
    }

    :global(ul > li) {
        @apply list-disc;
    }

    :global(ol > li) {
        @apply list-decimal;
    }

    /* Code blocks */
    :global(pre) {
        @apply bg-zinc-900/70 border border-zinc-800 rounded-lg p-4 my-4 overflow-x-auto;
    }

    :global(code) {
        @apply font-mono text-sm;
    }

    :global(:not(pre) > code) {
        @apply bg-zinc-800/50 text-yellow-600 px-1.5 py-0.5 rounded text-sm;
    }

    /* Blockquotes */
    :global(blockquote) {
        @apply border-l-4 border-yellow-500/30 bg-zinc-900/30 pl-4 py-2 my-4 text-zinc-300 italic;
    }

    /* Tables */
    :global(table) {
        @apply w-full border-collapse my-4;
    }

    :global(th) {
        @apply bg-zinc-800/50 text-left p-2 text-zinc-300 font-medium border border-zinc-700;
    }

    :global(td) {
        @apply p-2 border border-zinc-800 text-zinc-300;
    }

    /* Horizontal rules */
    :global(hr) {
        @apply my-8 border-zinc-800;
    }

    /* Images */
    :global(img) {
        @apply max-w-full rounded-lg border border-zinc-800 my-4;
    }

    /* Task Lists */
    :global(.task-list-item) {
        @apply list-none;
    }

    :global(.task-list-item-checkbox) {
        @apply mr-2;
    }
}
</style>