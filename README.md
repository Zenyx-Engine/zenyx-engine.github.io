# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

---

note: most* things in this repo are meant to be well documented, but some things are not. Apologies to any future contributors in advance - Caz.

# FIXME ⚠️
- [ ] navbar links dont lead anywhere
- [ ] footer links dont lead anywhere
- [ ] width of feature panels are inconsistent and illogical (e.g. long text in short boxes, vice versaa)
- [ ] hover effect for bento borders is global (applies to all bento borders)
- [ ] grid hover on hero section does not move when scrolling
- [X] under constructin pages return home doesnt have a consistent hitbox