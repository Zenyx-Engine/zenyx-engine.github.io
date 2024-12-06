<script>
  import { onMount } from 'svelte';
  import { Wrench, Construction, Hammer } from 'lucide-svelte';
  
  let mounted = false;
  let mouseX = 0;
  let mouseY = 0;

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
  on:mousemove={handleMouseMove}
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
      
      <!-- Animated wave decoration -->
      <div class="absolute -bottom-16 left-0 right-0 h-32 opacity-30">
        <div class="wave1"></div>
        <div class="wave2"></div>
        <div class="wave3"></div>
      </div>
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

  .wave1, .wave2, .wave3 {
    position: absolute;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(234,178,84,0.3), transparent);
    animation: wave 8s infinite linear;
  }

  .wave2 {
    animation-delay: -4s;
    opacity: 0.5;
  }

  .wave3 {
    animation-delay: -2s;
    opacity: 0.2;
  }

  :global(body) {
    background: black;
    overflow-x: hidden;
  }
</style>
