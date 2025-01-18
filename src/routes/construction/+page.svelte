<script>
  import { onMount } from 'svelte';
  import { Wrench, Construction, Hammer } from 'lucide-svelte';
  
  let mounted = false;
  let mouseX = $state(0);
  let mouseY = $state(0);

  onMount(() => {
    mounted = true;
    return () => mounted = false;
  });

  const handleMouseMove = (/** @type {{ clientX: number; clientY: number; }} */ event) => {
    if (!mounted) return;
    mouseX = event.clientX;
    mouseY = event.clientY;
  };
</script>

<div 
  class="min-h-screen bg-black overflow-hidden relative flex items-center justify-center"
  onmousemove={handleMouseMove}
  role="presentation"
>
  <!-- Grid with glow (similar to Hero) -->
  <div class="absolute inset-0" 
    style:background-image="repeating-linear-gradient(45deg,rgb(139,69,19,.1),rgb(234,178,84,0.1) 1px,transparent 1px,transparent 24px),repeating-linear-gradient(135deg,rgb(139,69,19,.1),rgb(139,69,19,.1) 1px,transparent 1px,transparent 24px)"
    style:filter="drop-shadow(0 0 2px rgba(139,69,19,0.5))"
  ></div>
  
  <!-- Interactive glow following cursor -->
  <div 
    class="absolute inset-0" 
    style:background={`radial-gradient(900px circle at ${mouseX}px ${mouseY}px,rgba(234,178,84,.15),transparent 80%)`}
  ></div>

  <!-- Content container -->
  <div class="relative z-10 text-center p-8">
    <div class="flex justify-center gap-4 mb-8">
      <Construction class="w-16 h-16 text-amber-500 animate-bounce" />
      <Hammer class="w-16 h-16 text-amber-500 animate-bounce delay-100" />
      <Wrench class="w-16 h-16 text-amber-500 animate-bounce delay-200" />
    </div>

    <h1 class="text-6xl font-bold mb-6 animate-pulse">
      <span class="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-transparent bg-clip-text">
        Under Construction
      </span>
    </h1>

    <div class="relative">
      <p class="text-xl text-amber-400/80 max-w-2xl mx-auto mb-8 animate-fade-in">
        We're building something amazing here. Check back soon!
      </p>
      
    </div>
    <button class="mt-8">
    <a 
      href="/"
      class="inline-block px-6 py-3 text-amber-500 border border-amber-500/50 rounded-lg
             hover:bg-amber-500/10 transition-all duration-300
             hover:shadow-[0_0_15px_rgba(234,178,84,0.5)]"
    >
      Return Home
    </a>
    </button>
  </div>
</div>

<style>
  @keyframes wave {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fade-in 1s ease-out forwards;
  }


  :global(body) {
    background: black;
    overflow-x: hidden;
  }
</style>
