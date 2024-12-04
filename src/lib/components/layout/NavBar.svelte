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
      href: "/",
      label: "Home",
      icon: HomeSolid,
    },
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

<nav class="left-nav flex justify-between items-center bg-gray-100 p-4">
  <div class="flex items-center space-x-4">
    {#each leftNavItems as item}
      <a href={item.href}>
        <svelte:component this={item.icon} />
        <span>{item.label}</span>
      </a>
    {/each}
  </div>

  <div class="right-nav flex items-center space-x-4">
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
    background-color: #000000;
    
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
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
    color: rgb(227, 233, 255);
  }
</style>
