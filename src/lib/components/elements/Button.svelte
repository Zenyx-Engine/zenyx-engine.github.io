<script>
    export let label = "";
    export let isPrimary = false;
    export let onClick = () => {};
    export let hexColor = "";
    export let classOverrides = "";
    export let styleOverrides = "";
    // svelte-ignore export_let_unused
        export let url = "";
    
</script>
<button
    class:bg-blue-500={isPrimary && !hexColor}
    class:bg-gray-500={!isPrimary && !hexColor}
    class:hover:bg-blue-600={isPrimary && !hexColor}
    class:hover:bg-gray-600={!isPrimary && !hexColor}
    class="text-white px-6 py-3 rounded-md flex items-center transition ease-in-out delay-0 hover:scale-110 duration-100 transform-gpu {classOverrides}"
    on:click={onClick}
    style="background-color: {hexColor}; {styleOverrides}"
>
    <slot></slot>
    <span class="ml-2">{label}</span>
</button>
