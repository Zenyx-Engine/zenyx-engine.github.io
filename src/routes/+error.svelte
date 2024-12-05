<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { AlertTriangle } from 'lucide-svelte';
    import { page } from '$app/stores'; 
    
    let mounted = false;
    let mouseX = 0;
    let mouseY = 0;
    let statuscode = $page.status
    
    const errorMessages = [
      [404, [
        "This page couldnt be found. Have you tried asking siri?",
        "I think google maps may have lied to you, this page doesnt exist",
        "Page not found - Maybe its out getting a cup of java?",
        "Looks like this page is playing hide and seek... and winning!",
        "This page has gone on vacation to find itself",
        "This page has commitment issues. Check back later",
        "This page is exploring the Bermuda Triangle",
        "404: Page is in witness protection (alledgedly)",
        "This page is busy building a time machine. maybe you will find it yesterday?",

      ]],
      [500, [
        "Something went wrong. try again later?",
        "An error has occured, ",
        "The hamsters powering our servers need a coffee break",
        "Our servers decided to rage quit",
        "500: Server is questioning its life choices",
        "Looks like our servers joined a meditation retreat",
        "Our server farm had a bad harvest",
        "500: Servers went on strike for better working conditions",
        "Our servers are out seeking therapy",
        "The servers are practicing their synchronized swimming",
        "The backend is having an existential breakdown",
        "The data center is having a moment",
        "500: Server caught a case of the Mondays",
      ]],
      [403, [
        "The bouncer says you're not on the list",
        "This area is for VIP programs only"
      ]]
    ];
  
    function getRandomMessage(code) {
      const errorGroup = errorMessages.find(([errorCode]) => errorCode === code);
      if (!errorGroup) return "Unexpected error occurred";
      const messages = errorGroup[1];
      return messages[Math.floor(Math.random() * messages.length)];
    }
  
    onMount(() => {
      mounted = true;
      return () => mounted = false;
    });
  
    const handleMouseMove = (event) => {
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
    <!-- Grid with glow -->
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
      <div class="flex justify-center mb-8">
        <AlertTriangle class="w-24 h-24 text-amber-500 animate-pulse" />
      </div>
  
      <h1 class="text-8xl font-bold mb-6 animate-glitch">
        <span class="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-transparent bg-clip-text">
          {statuscode}
        </span>
      </h1>
  
      <p class="text-2xl text-amber-400/80 max-w-2xl mx-auto mb-8 animate-fade-in">
        {getRandomMessage(statuscode)}
      </p>
  
      <!-- Animated wave decoration -->
      <div class="relative h-32 mb-8">
        <div class="wave1"></div>
        <div class="wave2"></div>
        <div class="wave3"></div>
      </div>
  
      <button>
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
  
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
      100% { transform: translate(0); }
    }
  
    .animate-fade-in {
      animation: fade-in 1s ease-out forwards;
    }
  
    .animate-glitch {
      animation: glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
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
