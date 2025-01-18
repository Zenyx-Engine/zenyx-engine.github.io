<script lang="ts">
    import { Download } from "lucide-svelte";

    export let mainText: string = "Download Zenyx";
    export let subText: string = "The next-gen deployment platform.";
    export let href: string = "/get";
</script>

<div class="flex flex-col items-center justify-center h-screen text-center">
    <div class="mb-8">
        <h1 class="font-extrabold text-4xl md:text-5xl lg:text-6xl text-amber-400">
            {mainText}
        </h1>
        <p class="mt-4 text-lg md:text-xl text-neutral-300">
            {subText}
        </p>
    </div>
    <a href={href} class="flex">
        <button
                class="px-5 py-4 text-lg md:text-xl text-amber-500 border border-amber-500/50 rounded-lg
            hover:bg-amber-500/10 hover:shadow-[0_0_20px_rgba(234,178,84,0.5)] transition-all duration-300
            flex items-center gap-4"
        >
            <Download class="w-6 h-6 md:w-8 md:h-8" />
            Download
        </button>
    </a>
</div>
