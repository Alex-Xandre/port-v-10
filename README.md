# xandremicua.vercel.app

My portfolio. Terminal-styled: amber phosphor on near-black, commands as
section headers, projects rendered as `ls -l`, career as a `git log`,
stack as an `npm ls` tree.

Built with Next.js (App Router), Tailwind v4, IBM Plex Mono + Sans.

## Notable bits

- **Interactive shell** — press `/`, click the hero prompt, or use the
  corner button. Tab completion, command history, real navigation
  (`projects --postgres` filters and routes). A few easter eggs.
- **Live ticker** — last push and public repo count pulled from the
  GitHub API server-side, cached hourly, hidden entirely if the fetch
  fails.
- **`theme green`** — the whole site recolors from one token block.
- **A cat** patrols the footer.

## Structure

```
src/
  app/
    (features)/        pages and their data files
    layout.tsx         fonts, shell, scanlines
    not-found.tsx      404 as a bash error
    globals.css        the token block — all theming lives here
  components/          button, container, shell, footer cat, markdown
  lib/                 site constants, posts, github, palettes
content/posts/         blog markdown
```

## Running it

```bash
npm install
npm run dev
```

## Template version

The design system is open source as
[terminal-portfolio](https://github.com/Alex-Xandre/terminal-portfolio) —
an agent harness (`AGENTS.md`) that encodes the rules, patterns, and
palette presets. Point Claude Code at it and it builds you something
related to this site but not a copy of it.

Writeup: [rules transfer](https://xandremicua.vercel.app/blogs/harness-experiment)

## Credits

Cat sprite from [oneko.js](https://github.com/adryd325/oneko.js) (MIT).
