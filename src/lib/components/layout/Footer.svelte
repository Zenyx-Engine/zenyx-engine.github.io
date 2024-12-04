<script lang="ts">
export let footerItems = [
    {
        href: "/",
        label: "placeholder"
    }
]
</script>
<footer class="footer bottom-0 text-center padding p-4 border-white/20 border-t-2 bg-black text-white w-full">
    <div class="flex items-center space-x-4">
        {#each footerItems as Item}
        <a href="{Item.href}" class="text-white hover:text-gray-300">
            <span>{Item.label}</span>
        </a>
    {/each}
</div>
</footer>



<style>
    /* .footer {
        text-align: center;
        padding: 1rem;
        background-color: black;
        border-top: 1px solid #e9ecef;
    } */
</style>