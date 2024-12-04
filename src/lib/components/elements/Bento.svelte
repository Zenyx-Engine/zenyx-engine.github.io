<script lang="ts">
  import { onMount } from 'svelte';
  import { Cloud, Zap, Shield, Terminal, GitBranch, Network, Cpu, Activity, Settings,FireExtinguisher,Puzzle } from 'lucide-svelte';

  const features = [
    {
        icon: GitBranch,
        title: "Open source",
        description: "Zenyx is open source, licensed under the well loved MIT license. This means it will stay freee and open for everyone to use and contribute to. Forever",
        area: "feat1",
        className: "lg:col-span-3"
    },
    {
        icon: FireExtinguisher,
        title: "Speed and safety",
        description: "Optimized build and deployment pipeline delivers maximum speed and efficiency.",
        area: "feat3",
        className: "lg:col-span-2 "
    },
    {
        icon: Terminal,
        title: "Integrated REPL",
        description: "Zenyx comes with a built-in REPL and terminal inerface components that is a core part of the engine, allowing you to interact, debug, and test your code in real-time. without spending time and resources on developing a separate toolset.",
        area: "feat4",
        className: "lg:col-span-1"
    },
    {
        icon: Puzzle,
        title: "Modular",
        description: "",
        area: "feat5",
        className: "lg:col-span-1"
    },
    {
        icon: Network,
        title: "Service Mesh Integration",
        description: "Built-in service mesh provides advanced networking, traffic management, and observability. Support for Istio, Linkerd, and custom implementations.",
        area: "feat6",
        className: "lg:col-span-2"
    },
    {
        icon: Cpu,
        title: "Container Orchestration",
        description: "Advanced container orchestration with support for Kubernetes, Docker Swarm, and custom schedulers.",
        area: "feat7",
        className: "lg:col-span-2"
    },
    {
        icon: Activity,
        title: "Real-time Monitoring",
        description: "Comprehensive monitoring and alerting capabilities with custom dashboards.",
        area: "feat8",
        className: "lg:col-span-1"
    },
    {
        icon: Settings,
        title: "Setting",
        description: "Automate routine operations with self-healing infrastructure and predictive scaling.",
        area: "feat9",
        className: "lg:col-span-3"
    }
  ];

  // Card hover state tracking
  let hoverStates = features.map(() => ({
    isHovered: false,
    mousePosition: { x: 0, y: 0 }
  }));
  
  let supportsSpotlight = true;

  onMount(() => {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    supportsSpotlight = !isFirefox && !isMobile;
    supportsSpotlight = false;
  });

  function handleMouseMove(event: MouseEvent, index: number) {
    if (!supportsSpotlight) return;
    
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    hoverStates[index].mousePosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  function handleMouseEnter(index: number) {
    hoverStates[index].isHovered = true;
  }

  function handleMouseLeave(index: number) {
    hoverStates[index].isHovered = false;
  }

  let mouseX = 0;
  let mouseY = 0;

  function handleSectionMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
</script>
  <section 
    class="py-0 px-0 bg-black relative"
    on:mousemove={handleSectionMouseMove}
    role="region"
  >
          <div class="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12">
            <div class="text-center mb-12 md:mb-20">
              <h2 class="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                <span class="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-transparent bg-clip-text">
                  The features you love
                </span>
              </h2>
              <p class="text-base md:text-lg text-amber-400/80 max-w-2xl mx-auto px-4">
                Zenyx aims to provide a fully featured toolset of components, utilites, and just nice to have features that you can use to build your next project. Game or otherwise.
              </p>
            </div>
    
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-fr">
              {#each features as feature, i}
          <div 
            class="group relative p-4 md:p-6 bg-gray-950/80 backdrop-blur-sm rounded-lg transition-all duration-300 overflow-hidden h-full {feature.className}"
            style="border: 1px solid; border-image: radial-gradient(900px circle at {mouseX}px {mouseY}px, rgba(234,178,84,0.5), rgba(234,178,84,0.1)) 1;"
            on:mousemove={(e) => handleMouseMove(e, i)}
            on:mouseenter={() => handleMouseEnter(i)}
            on:mouseleave={() => handleMouseLeave(i)}
            role="button"
            tabindex="0"
          >
            {#if supportsSpotlight}
              <div 
                class="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style="opacity: {hoverStates[i].isHovered ? 1 : 0}; 
                     background: radial-gradient(200px circle at {hoverStates[i].mousePosition.x}px {hoverStates[i].mousePosition.y}px, 
                                 rgba(234,178,84,.15), rgba(234,178,84,0.05) 40%, transparent 60%)"
              ></div>
            {/if}

            {#if !supportsSpotlight}
              <div 
                class="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style="opacity: {hoverStates[i].isHovered ? 1 : 0};
                     background: linear-gradient(to bottom right, rgba(234,178,84,0.05), rgba(139,69,19,0.05))"
              ></div>
            {/if}

            <div
              class="absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none opacity-0 group-hover:opacity-100"
              style="background: linear-gradient(to right, rgba(234,178,84,0.1), rgba(139,69,19,0.1));
                   mask-image: linear-gradient(to bottom, transparent, black, transparent);
                   -webkit-mask-image: linear-gradient(to bottom, transparent, black, transparent);"
            ></div>

            <div class="relative h-full flex flex-col">
              <div class="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div class="p-1.5 md:p-2 rounded-lg bg-gray-900/50 backdrop-blur-xl">
                  <svelte:component this={feature.icon} class="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                </div>
                <h3 class="text-base md:text-lg font-semibold text-gray-200">
                  {feature.title}
                </h3>
              </div>
              <p class="text-xs md:text-sm text-gray-400 leading-relaxed flex-grow">
                {feature.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div> 
  </section>

  
<style>
</style>