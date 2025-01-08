<script lang="ts">
    import type { Icon } from "lucide-svelte";

    interface FooterItem {
        href: string;
        label: string;
        icon?: Icon
    }
    let { footerItems = [
    {
        href: "/",
        label: "placeholder"
    }
] } = $props();
</script>
<footer class="footer bottom-0 text-center padding p-4 border-white/20 border-t-2 bg-black text-white w-full">
    <div class="flex items-center space-x-4">
        {#each footerItems as Item}
        <a href="{Item.href}" class="text-white hover:text-gray-300">
            <span>{Item.label}</span>
            <svelte:component this={Item.icon} class="w-6 h-6" />
        </a>
    {/each}
</div>
</footer>