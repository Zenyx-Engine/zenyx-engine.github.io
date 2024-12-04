<script>
    import { onMount } from 'svelte';
    let mounted = false, mouseX = 0, mouseY = 0;
  
    onMount(() => {
      mounted = true;
      return () => mounted = false;
    });
  
    const handleMouseMove = (/** @type {{ clientX: number; clientY: number; }} */ event) => {
      if (!mounted) return;
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
  </script>

  <div class="min-h-screen bg-black overflow-hidden" on:mousemove={handleMouseMove} role="presentation">
    <!-- Grid with glow -->
    <div class="absolute inset-0" style:background-image="repeating-linear-gradient(45deg,rgb(139,69,19,.1),rgb(234,178,84,0.1) 1px,transparent 1px,transparent 24px),repeating-linear-gradient(135deg,rgb(139,69,19,.1),rgb(139,69,19,.1) 1px,transparent 1px,transparent 24px)" style:filter="drop-shadow(0 0 2px rgba(139,69,19,0.5))"></div>
    <div class="absolute inset-0" style:background={`radial-gradient(900px circle at ${mouseX}px ${mouseY}px,rgba(234,178,84,.15),transparent 80%)`}></div>
    <div class="absolute inset-0 bg-gradient-to-t to-transparent from-black to-[48px]"></div>
    <div class="relative flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <img src="zenyx-logo.svg" alt="Zenyx Logo" class="w-48 h-48 mb-4 shadow-[0_0_25px_rgba(234,178,84,0.4)] rounded-full" />
      <h1 class="text-6xl font-bold mb-4 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">Zenyx</h1>
      <div class="space-y-2 text-2xl text-amber-500/80 [text-shadow:0_0_10px_rgba(245,158,11,0.3)]">
        <p>A modern game engine</p>
        <p>For every platform</p>
        
      </div>
      <button class="mt-12 px-8 py-3 text-lg rounded-full bg-transparent text-amber-500 border border-amber-500/50 hover:bg-amber-500/30 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
        Get Zenyx now now
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
      </button>
    </div>
  </div>
  
  <style>
    :global(body) {
      background: black;
    }
  </style>