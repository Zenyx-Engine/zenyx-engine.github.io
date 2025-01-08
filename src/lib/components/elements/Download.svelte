<script>
  import { run } from 'svelte/legacy';

    import { onMount } from 'svelte';
    import { Download, Settings, ChevronDown } from 'lucide-svelte';
  
    let mouseX = $state(0);
    let mouseY = $state(0);
    let mounted = false;

    const downloads = [
      {
        platform: 'Linux',
        architectures: [
          { name: 'x86_64', label: '64-bit Intel/AMD', link: 'https://github.com/Zenyx-Engine/Zenyx' },
          { name: 'aarch64', label: 'ARM 64-bit', link: 'https://github.com/Zenyx-Engine/Zenyx' }
        ]
      },
      {
        platform: 'macOS',
        architectures: [
          { name: 'x86_64', label: '64-bit Intel', link: 'https://github.com/Zenyx-Engine/Zenyx' },
          { name: 'aarch64', label: 'Apple Silicon', link: 'https://github.com/Zenyx-Engine/Zenyx' }
        ]
      },
      {
        platform: 'Windows',
        architectures: [
          { name: 'x86_64', label: '64-bit', link: 'https://github.com/Zenyx-Engine/Zenyx' }
        ]
      }
    ];
  
    let selectedPlatform = $state(downloads[0]);
    let selectedArchitecture = $state(selectedPlatform.architectures[0]);
    let platformDropdownOpen = $state(false);
    let architectureDropdownOpen = $state(false);
  
    let availableArchitectures = $derived(selectedPlatform.architectures);
    run(() => {
      // Reset architecture if current one not available in new platform
      if (!availableArchitectures.includes(selectedArchitecture)) {
        selectedArchitecture = availableArchitectures[0];
      }
    });

    onMount(() => {
      mounted = true;
      return () => mounted = false;
    });

    const handleMouseMove = (/** @type {{ clientX: number; clientY: number; }} */ event) => {
      if (!mounted) return;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    // Toggle dropdown functions
    function togglePlatformDropdown() {
      platformDropdownOpen = !platformDropdownOpen;
      architectureDropdownOpen = false;
    }

    function toggleArchitectureDropdown() {
      architectureDropdownOpen = !architectureDropdownOpen;
      platformDropdownOpen = false;
    }

    /**
     * @param {{ platform: string; architectures: { name: string; label: string; link: string; }[]; }} platform
     */
    function selectPlatform(platform) {
      selectedPlatform = platform;
      platformDropdownOpen = false;
    }

    /**
     * @param {{ name: string; label: string; link: string; }} arch
     */
    function selectArchitecture(arch) {
      selectedArchitecture = arch;
      architectureDropdownOpen = false;
    }
</script>
  
<div 
  class="min-h-screen bg-black overflow-hidden relative flex items-center justify-center"
  onmousemove={handleMouseMove}
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
  <div class="relative z-10 text-center p-8 w-full max-w-4xl">
    <div class="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-amber-500/20">
      <h2 class="text-4xl font-bold mb-6    ">
        <span class="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-transparent bg-clip-text">
          Download Zenyx
        </span>
      </h2>

      <p class="text-amber-400/80 max-w-2xl mx-auto mb-8 animate-fade-in">
        Select your platform and download the latest version
      </p>

      <!-- Platform Dropdown -->
      <div class="relative mb-6">
        <h3 class="text-sm text-amber-400/60 mb-2">Platform</h3>
        <button 
          class="w-full bg-black/50 border border-amber-500/30 p-3 rounded-lg flex items-center justify-between hover:bg-amber-500/10 transition-all duration-300"
          onclick={togglePlatformDropdown}
        >
          <div class="flex items-center gap-2">
            <Settings class="w-5 h-5 text-amber-400" />
            <span class="text-amber-300">
              {selectedPlatform.platform}
            </span>
          </div>
          <ChevronDown class="w-4 h-4 text-amber-400" />
        </button>

        {#if platformDropdownOpen}
          <div class="absolute z-10 w-full mt-1 bg-black border border-amber-500/30 rounded-lg shadow-lg">
            {#each downloads as platform}
              <button 
                class="w-full text-left p-3 hover:bg-amber-500/10 {selectedPlatform === platform ? 'bg-amber-500/20' : ''}"
                onclick={() => selectPlatform(platform)}
              >
                <span class="{selectedPlatform === platform ? 'text-amber-300' : 'text-amber-400/80'}">
                  {platform.platform}
                </span>
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Architecture Dropdown -->
      {#if selectedPlatform.platform === 'Windows'}
        <div class="bg-amber-950/30 p-4 rounded-lg border border-amber-800/50 mb-6">
          <p class="text-amber-300 text-sm">
            Zenyx is currently only available for 64-bit (x86_64) Windows.
          </p>
        </div>
      {:else if availableArchitectures.length > 1}
        <div class="relative mb-6">
          <h3 class="text-sm text-amber-400/60 mb-2">Architecture</h3>
          <button 
            class="w-full bg-black/50 border border-amber-500/30 p-3 rounded-lg flex items-center justify-between hover:bg-amber-500/10 transition-all duration-300"
            onclick={toggleArchitectureDropdown}
          >
            <div class="flex items-center gap-2">
              <span class="text-amber-300">
                {selectedArchitecture.name}
              </span>
              <span class="text-xs text-amber-500/60">
                {selectedArchitecture.label}
              </span>
            </div>
            <ChevronDown class="w-4 h-4 text-amber-400" />
          </button>

          {#if architectureDropdownOpen}
            <div class="absolute z-10 w-full mt-1 bg-black border border-amber-500/30 rounded-lg shadow-lg">
              {#each availableArchitectures as arch}
                <button 
                  class="w-full text-left p-3 hover:bg-amber-500/10 {selectedArchitecture === arch ? 'bg-amber-500/20' : ''}"
                  onclick={() => selectArchitecture(arch)}
                >
                  <div class="flex justify-between items-center">
                    <span class="{selectedArchitecture === arch ? 'text-amber-300' : 'text-amber-400/80'}">
                      {arch.name}
                    </span>
                    <span class="text-xs text-amber-500/60">
                      {arch.label}
                    </span>
                  </div>
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- Download Button -->
      <div class="mt-8">
        <a 
          href={selectedArchitecture.link} 
          class="w-full flex  px-6 py-3 text-amber-500 border border-amber-500/50 rounded-lg
                 hover:bg-amber-500/10 transition-all duration-300
                 hover:shadow-[0_0_15px_rgba(234,178,84,0.5)] items-center "
        >
          <Download class="w-4 h-4" />
          Coming soon 
        </a>
      </div>
    </div>
  </div>    

  <!-- Animated wave decoration -->

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
</style>