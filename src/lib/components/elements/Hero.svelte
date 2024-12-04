<script>
    import { onMount } from 'svelte';
    let mounted = false;
    let mouseX = 0;
    let mouseY = 0;
  
    onMount(() => {
      mounted = true;
      return () => mounted = false;
    });
  
    // @ts-ignore
    function handleMouseMove(event) {
      if (!mounted) return;
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
  </script>
  
  <div 
    class="min-h-screen bg-black overflow-hidden"
    on:mousemove={handleMouseMove}
    role="presentation"
  >
    <!-- Grid Background -->
    <div 
      class="absolute inset-0"
      style:background-image="repeating-linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.2) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(to bottom, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.2) 1px, transparent 1px, transparent 24px)"
    ></div>
  
    <!-- Mouse Gradient -->
    <div 
      class="absolute inset-0" 
      style:background={`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)`}
    ></div>
  
    <!-- Content -->
    <div class="relative flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 class="text-6xl font-bold mb-4 text-amber-500">Zenyth</h1>
      <div class="space-y-2 text-2xl text-amber-500/80">
        <p>The greatest</p>
        <p>text editor</p>
        <p>For every</p>
        <p>platform</p>
      </div>
      <button class="mt-12 px-8 py-3 text-lg rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/50 hover:bg-amber-500/30 transition-all flex items-center gap-2">
        Get zenyth now
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  </div> 
  
  

<style>
    @keyframes pulse {
        0% {
            opacity: 0.5;
        }
        50% {
            opacity: 0.8;
        }
        100% {
            opacity: 0.5;
        }
    }


</style>
