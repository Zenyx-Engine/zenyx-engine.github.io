<script>
  import {
    Bars3,
    Home,
    User,
    Envelope,
    QuestionMarkCircle,
  } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { QuestionCircleSolid } from "flowbite-svelte-icons";

  let leftNavItems = [
    {
      href: "/construction",
      label: "About",
      icon: QuestionCircleSolid,
    }, //unused
  ];
  let rightNavItems = [
    {
      href: "/#features",
      label: "Features",
    },
    {
      href: "/docs",
      label: "Docs",
    },
    {
      href: "/construction",
      label: "Blog",
    },
    {
      href: "/construction",
      label: "Community",
    },
    {
      href: "https://github.com/Zenyx-Engine/Zenyx",
      label: "Source",
    },
  ];

  let isMenuOpen = $state(false);
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
  };
</script>

<nav class="left-nav flex justify-between bg-black/20 backdrop-blur-sm sticky top-0 z-50 p-0">
  <div class="flex items-center space-x-4 md:justify-start justify-center flex-grow md:flex-grow-0">
    <a href="/">
      <img src="typeface.svg" alt="Zenyx Logo" class="h-12" />
    </a>
    <div class="flex items-center space-x-4 p-4">
    </div>
  </div>
  
  <!-- Mobile menu button -->
  <button class="md:hidden p-4" onclick={toggleMenu}>
    <Icon src={Bars3} class="w-6 h-6 text-white" />
  </button>

  <!-- Desktop menu -->
  <div class="right-nav hidden md:flex items-center space-x-4 p-4">
    {#each rightNavItems as item}
      <a href={item.href}>
        <span>{item.label}</span>
      </a>
    {/each} 
  </div>

  <!-- Mobile menu -->
  {#if isMenuOpen}
    <div class="absolute top-full left-0 right-0 bg-black/90 md:hidden">
      {#each rightNavItems as item}
        <a href={item.href} class="block p-4 hover:bg-black/50">
          <span>{item.label}</span>
        </a>
      {/each}
    </div>
  {/if}
</nav>

<style>
  
  nav {
    display: flex;
    gap: 2rem;
    position: sticky;
    top: 0;
    padding-right: 2rem;
    padding-left: 2rem;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: center;
  }
  .right-nav {
    gap: 1rem;
  }

  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: rgb(255, 241, 218);
  }

  @media (max-width: 768px) {
    nav {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
  }
</style>
