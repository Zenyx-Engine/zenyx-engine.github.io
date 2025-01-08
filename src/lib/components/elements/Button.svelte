<script>
    
    /**
     * @typedef {Object} Props
     * @property {string} [label]
     * @property {boolean} [isPrimary]
     * @property {any} [onClick]
     * @property {string} [hexColor]
     * @property {string} [classOverrides]
     * @property {string} [styleOverrides]
     * @property {string} [url] - svelte-ignore export_let_unused
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let {
        label = "",
        isPrimary = false,
        onClick = () => {},
        hexColor = "",
        classOverrides = "",
        styleOverrides = "",
        url = "",
        children
    } = $props();
    
</script>
<button
    class:bg-blue-500={isPrimary && !hexColor}
    class:bg-gray-500={!isPrimary && !hexColor}
    class:hover:bg-blue-600={isPrimary && !hexColor}
    class:hover:bg-gray-600={!isPrimary && !hexColor}
    class="text-white px-6 py-3 rounded-md flex items-center transition ease-in-out delay-0 hover:scale-110 duration-100 transform-gpu {classOverrides}"
    onclick={onClick}
    style="background-color: {hexColor}; {styleOverrides}"
>
    {@render children?.()}
    <span class="ml-2">{label}</span>
</button>
