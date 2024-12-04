<script>
  import {
    Bars3,
    Home,
    User,
    Envelope,
    QuestionMarkCircle,
  } from "@steeze-ui/heroicons";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { GithubSolid,WindowsSolid,ArchiveArrowDownSolid, AppleSolid, WindowSolid,GiftBoxSolid,HomeSolid,QuestionCircleSolid } from "flowbite-svelte-icons";

  let leftNavItems = [
    {
      href: "/about",
      label: "About",
      icon: QuestionCircleSolid,
    },
  ];
  let rightNavItems = [
    {
      href: "/features",
      label: "Products",
    },
    {
      href: "/docs",
      label: "Docs",
    },
    {
      href: "/community",
      label: "Community",
    },
    {
      href: "/get",
      label: "Github",
    },
  ];
</script>

<nav class="left-nav flex justify-between bg-black/20 backdrop-blur-sm sticky top-0 z-50 p-0">
  <div class="flex items-center space-x-4">
  <img src="typeface.svg" alt="Zenyx Logo" class="h-12" />
  <div class="flex items-center space-x-4 p-4">
    {#each leftNavItems as item}
      <a href={item.href}>
        <svelte:component this={item.icon} />
        <span>{item.label}</span>
      </a>
    {/each}
  </div>
</div>
  <div class="right-nav flex items-center space-x-4 p-4">
    {#each rightNavItems as item}
      <a href={item.href}>
        <span>{item.label}</span>
      </a>
    {/each}
  </div>
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
</style>
