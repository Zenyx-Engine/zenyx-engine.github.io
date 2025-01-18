<script lang="ts">
    import { marked } from 'marked';
    import { onMount } from 'svelte';
    import { Copy, CheckCheck } from 'lucide-svelte';

    interface Props {
        content?: string;
    }

    let { content = '' }: Props = $props();
    // Configure marked options
    marked.setOptions({
        gfm: true,
        breaks: true,
    });

    // Custom renderer
    //@ts-ignore
    const renderer: marked.Renderer = {
        // Custom code block rendering
        code({ text, lang, escaped }: { text: string; lang?: string; escaped?: boolean }): string {
            const escapedCode = escaped ? text : text.replace(/"/g, '&quot;');
            
            return `
                <div class="relative group">
                    <div class="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="copy-btn p-2 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg text-zinc-400 hover:text-white transition-all"
                                data-code="${escapedCode}">
                            <svg class="copy-icon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z"></path>
                                <path d="M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2"></path>
                            </svg>
                            <svg class="check-icon hidden w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 6L9 17l-5-5"></path>
                                <path d="M20 12L9 23l-5-5"></path>
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
        },

        // Custom blockquote rendering
        blockquote({ tokens }: { tokens: any }): string {
            console.log('Blockquote tokens:', tokens);
            // Parse the content from tokens
            const text = marked.parseInline(tokens.map((t: any) => t.raw).join('')) as string;
            const noteMatch = text.match(/^\[!(IMPORTANT|NOTE|WARNING)\](.*)/);
            
            if (noteMatch) {
                console.log('Matched note:', noteMatch);
                const type = noteMatch[1].toLowerCase();
                const content = noteMatch[2].trim();
                return `
                    <blockquote class="${type}-note">
                        <strong>${type.toUpperCase()}:</strong> ${content}
                    </blockquote>
                `;
            }

            return `<blockquote>${text}</blockquote>`;
        }
    };

    onMount(() => {
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const code = (button as HTMLButtonElement).dataset.code;
                
                if (code) {
                    navigator.clipboard.writeText(code);
                    
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

    // Use the custom renderer
    const htmlContent = marked(content, { renderer });
</script>

<!-- SVG Icons -->
<svg class="hidden" xmlns="http://www.w3.org/2000/svg">
    <symbol id="copy-icon" viewBox="0 0 24 24">
        <Copy />
    </symbol>
    <symbol id="check-icon" viewBox="0 0 24 24">
        <CheckCheck />
    </symbol>
</svg>

<div class="markdown prose prose-invert max-w-none">
    {@html htmlContent}
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

        :global(p) {
            @apply text-zinc-300 leading-relaxed mb-4;
        }

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
            @apply list-decimal font-bold ml-4;
        }

        :global(pre) {
            @apply bg-zinc-900/70 border border-zinc-800 rounded-lg p-4 my-4 overflow-x-auto;
        }

        :global(code) {
            @apply font-mono text-sm;
        }

        :global(:not(pre) > code) {
            @apply bg-zinc-800/50 text-yellow-600 px-1.5 py-0.5 rounded text-sm;
        }

        :global(blockquote) {
            @apply border-l-4 border-yellow-500/30 bg-zinc-900/30 pl-4 py-2 my-4 text-zinc-300 italic;
        }

        :global(table) {
            @apply w-full border-collapse my-4;
        }

        :global(th) {
            @apply bg-zinc-800/50 text-left p-2 text-zinc-300 font-medium border border-zinc-700;
        }

        :global(td) {
            @apply p-2 border border-zinc-800 text-zinc-300;
        }

        :global(hr) {
            @apply my-8 border-zinc-800;
        }

        :global(img) {
            @apply max-w-full rounded-lg border border-zinc-800 my-4;
        }

        :global(.task-list-item) {
            @apply list-none;
        }

        :global(.task-list-item-checkbox) {
            @apply mr-2;
        }
    }

    :global(.important-note) {
        @apply border-l-4 border-red-500 bg-red-100 text-red-700 p-4 my-4;
    }

    :global(.note-note) {
        @apply border-l-4 border-blue-500 bg-blue-100 text-blue-700 p-4 my-4;
    }

    :global(.warning-note) {
        @apply border-l-4 border-yellow-500 bg-yellow-100 text-yellow-700 p-4 my-4;
    }
</style>
    