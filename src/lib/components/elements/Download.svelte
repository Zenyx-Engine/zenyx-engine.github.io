<script lang="ts">
  import { onMount } from 'svelte';
  import { scale, fly } from 'svelte/transition';
  import { Download, Apple, Monitor, AppWindowIcon, type Icon as IconType, Heart } from 'lucide-svelte';

  let has_clicked_download: boolean = false;

  interface Platform {
    icon: typeof IconType;
    platform: string;
    execName: string;
    architectures: DownloadItem[];
  }

  interface DownloadItem {
    name: string;
    label: string;
    link: string;
  }

  const downloads: Platform[] = [
    {
      icon: AppWindowIcon,
      platform: 'Windows',
      execName: 'Zenyx',
      architectures: [
        { name: 'x86_64', label: '64-bit', link: '' }
      ]
    },
    {
      icon: Apple,
      platform: 'macOS',
      execName: 'Zenyx',
      architectures: [
        { name: 'x86_64', label: '64-bit Intel', link: '' },
        { name: 'aarch64', label: 'Apple Silicon', link: '' }
      ]
    },
    {
      icon: Monitor,
      platform: 'Linux',
      execName: 'Zenyx',
      architectures: [
        { name: 'x86_64', label: '64-bit Intel/AMD', link: '' },
        { name: 'aarch64', label: 'ARM 64-bit', link: '' }
      ]
    }
  ];

  let selectedPlatform: Platform = downloads[0];
  let selectedArchitecture: DownloadItem = selectedPlatform.architectures[0];
  let architectureDropdownOpen = false;

  onMount(() => {
    const os = detectOS();
    const defaultPlatform = downloads.find((platform) => platform.platform === os);

    if (defaultPlatform) {
      selectedPlatform = defaultPlatform;
      selectedArchitecture = selectedPlatform.architectures[0];
    }
  });

  function detectOS(): string {
    const userAgent = navigator.userAgent || (window as any).opera;

    if (/Windows/i.test(userAgent)) return 'Windows';
    if (/Mac/i.test(userAgent)) return 'macOS';
    if (/Linux/i.test(userAgent)) return 'Linux';

    return 'Windows'; // This is the most common so we fall back to it
  }

  function selectPlatform(platform: Platform) {
    selectedPlatform = platform;
    selectedArchitecture = platform.architectures[0];
  }

  function toggleArchitectureDropdown() {
    architectureDropdownOpen = !architectureDropdownOpen;
  }

  function selectArchitecture(arch: DownloadItem) {
    selectedArchitecture = arch;
    architectureDropdownOpen = false;
  }

  function triggerDownload() {
    has_clicked_download = true;

    const link = document.createElement('a');
    link.href = selectedArchitecture.link;
    link.download = `${selectedPlatform.execName}-${selectedArchitecture.name}.zip`;
    link.target = '_blank';
    document.body.appendChild(link);
    document.body.removeChild(link);

    setTimeout(() => {
      has_clicked_download = false;
    }, 1500); // Adjust timeout to match animation duration
  }
</script>

<div class="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
  <!-- Heading -->
  <h2 class="text-4xl font-bold mb-8 text-amber-300 text-center">
    Download Zenyx
  </h2>

  <p class="text-amber-400/80 text-center mb-8">
    Select your platform and architecture to download the latest version.
  </p>

  <!-- Platform Buttons -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
    {#each downloads as platform}
      <button
              class="p-6 rounded-lg text-center bg-black border border-amber-500/30
        hover:bg-amber-500/10 hover:shadow-[0_0_10px_rgba(234,178,84,0.5)] transition-all duration-300
        {selectedPlatform === platform ? 'bg-amber-500/10' : ''}"
              onclick={() => selectPlatform(platform)}
              transition:scale="{{ duration: 300 }}"
      >
        <platform.icon class="w-10 h-10 mx-auto text-amber-300 mb-4" />
        <span class="text-xl font-medium text-amber-300">{platform.platform}</span>
      </button>
    {/each}
  </div>

  <!-- Architecture Dropdown -->
  <div class="relative mb-8">
    <button
            class="w-64 bg-black/50 border border-amber-500/30 p-3 rounded-lg flex items-center justify-between hover:bg-amber-500/10 transition-all duration-300"
            onclick={toggleArchitectureDropdown}
    >
      <div class="flex items-center gap-2">
        <span class="text-amber-300">{selectedArchitecture.name}</span>
        <span class="text-xs text-amber-500/60">{selectedArchitecture.label}</span>
      </div>
      <svg class="w-4 h-4 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {#if architectureDropdownOpen}
      <div class="absolute z-10 w-64 mt-2 bg-black border border-amber-500/30 rounded-lg shadow-lg">
        {#each selectedPlatform.architectures as arch}
          <button
                  class="w-full text-left p-3 hover:bg-amber-500/10 transition-all duration-300 {selectedArchitecture === arch ? 'bg-amber-500/20' : ''}"
                  onclick={() => selectArchitecture(arch)}
                  transition:scale="{{ duration: 300 }}"
          >
            <div class="flex justify-between">
              <span class="{selectedArchitecture === arch ? 'text-amber-300' : 'text-amber-400/80'}">
                {arch.name}
              </span>
              <span class="text-xs text-amber-500/60">{arch.label}</span>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Download Button -->
  <button
          class="px-8 py-4 text-amber-500 border border-amber-500/50 rounded-lg
    hover:bg-amber-500/10 hover:shadow-[0_0_15px_rgba(234,178,84,0.5)] transition-all duration-300
    flex items-center gap-3"
          onclick={triggerDownload}
          transition:fly="{{ y: 20, duration: 300 }}"
  >
    <Download class="w-5 h-5" />
    Download {selectedPlatform.platform} - {selectedArchitecture.label}
  </button>

  <!-- Thank You Message -->
  {#if has_clicked_download}
    <div
            class="thank-you-container animate-bounce"
            transition:fly="{{ y: -20, duration: 500, delay: 350 }}"
    >
      <span class="group inline-flex items-center gap-1 p-2">
        <span>Thank you for trying Zenyx!</span>
        <Heart class="w-5 h-5 text-amber-500" />
      </span>
    </div>
  {/if}
</div>

<style>
  .thank-you-container {
    position: absolute;
    top: 80%;
    transform: translate(-50%, -50%);
  }
</style>
