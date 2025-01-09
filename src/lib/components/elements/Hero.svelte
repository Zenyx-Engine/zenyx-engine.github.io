<script>
    import { onMount } from 'svelte';
    let mounted = false, mouseX = $state(0), mouseY = $state(0);
  
    onMount(() => {
      mounted = true;
      return () => mounted = false;
    });
  
    const handleMouseMove = (/** @type {{ pageX: number; pageY: number; }} */ event) => {
      if (!mounted) return;
      mouseX = event.pageX;
      mouseY = event.pageY;
    }
  </script>

  <div class="min-h-screen bg-black overflow-hidden" onmousemove={handleMouseMove} role="presentation">
    <!-- Grid with glow -->
    <div class="absolute inset-0" style:background-image="repeating-linear-gradient(45deg,rgb(139,69,19,.1),rgb(234,178,84,0.1) 1px,transparent 1px,transparent 24px),repeating-linear-gradient(135deg,rgb(139,69,19,.1),rgb(139,69,19,.1) 1px,transparent 1px,transparent 24px)" style:filter="drop-shadow(0 0 2px rgba(139,69,19,0.5))"></div>
    <div class="absolute inset-0" style:background={`radial-gradient(900px circle at ${mouseX}px ${mouseY}px,rgba(234,178,84,.15),transparent 80%)`}></div>
    <div class="absolute inset-0 bg-gradient-to-t to-transparent from-black to-[48px]"></div>
    <div class="relative flex flex-col items-center justify-center min-h-screen p-8 text-center ">


        <img src="zenyx-logo.svg" alt="Zenyx Logo" class="w-48 h-48 mb-4 shadow-[0_0_25px_rgba(234,178,84,0.4)] rounded-full hover:shadow-[0_0_40px_rgba(234,178,84,0.6)] hover:scale-105 hover:-translate-y-1 transition-all duration-300" />
      <h1 class="text-6xl font-bold mb-4 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">Zenyx</h1>      <div class="space-y-2 text-2xl text-amber-500/80 [text-shadow:0_0_10px_rgba(245,158,11,0.3)]">
        <p>A modern game engine</p>
        <p>For every platform</p>
        
      </div>
    </div>
  </div>
  
  <style>
    :global(body) {
      background: black;
    }
  </style>