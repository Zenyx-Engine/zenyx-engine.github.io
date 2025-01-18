<script lang="ts">
    import {Heart, Icon,} from "lucide-svelte";
    import type {Component} from 'svelte';
    interface FooterItem {
        href: string;
        label: string;
        icon?: Component
    }
    let { footerItems = [
    {
        href: "/",
        label: ""
    }
] }: { footerItems?: FooterItem[] } = $props();
</script>
<footer class="footer bottom-0 text-center padding p-4 border-white/20 border-t-2 bg-black w-full">
    <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
            {#each footerItems as Item}
                <a href="{Item.href}" class="text-neutral-500 hover:text-neutral-700">
                    <span>{Item.label}</span>
                    {#if Item.icon}
                        <Item.icon class="w-6 h-6" />
                    {/if}
                </a>
            {/each}
        </div>

        <span class="group inline-flex items-center gap-1">
            <span class="text-neutral-500 group-hover:text-neutral-700">Made with</span>
            <Heart class="text-red-900 group-hover:text-red-950" />
            <span class="text-neutral-500 group-hover:text-neutral-700">by Caznix and the open source community</span>
        </span>
    </div>
</footer>