## What this site covers

- **Features** — races, class work, professions, world, itemization, guilds, PvP, and more
- **News** — development posts, also published as `/rss.xml`
- **Changelog** — versioned patch notes
- **Roadmap** — what is in progress, next, planned, or on the horizon
- **Talent calculator** — plan and share class trees
- **DB** — a knowledge base of Windrunner systems
- **Stolen assets** — art used on the site, with a way to request credit or a takedown

## Running the website

You need [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

Build a static site:

```bash
bun run build
bun run preview
```

Optional environment variables:

| Variable | Purpose |
| --- | --- |
| `BASE_PATH` | Subpath if the site is not served from `/` |
| `PUBLIC_SITE_URL` | Canonical origin used while prerendering |

## Editing content

Day-to-day content lives in a few files:

| Content | Where |
| --- | --- |
| News articles | `src/lib/content/news/` (Markdown; filename is the URL slug) |
| Changelog | `src/lib/data/changelog.ts` |
| Roadmap | `src/lib/data/roadmap.ts` |
| Feature copy and navigation | `src/lib/data/features.ts`, `src/lib/data/featureNav.ts` |
| Images | `static/art/` (referenced as `/art/...`) |

Step-by-step notes for news, changelog, and roadmap entries are in [`howTo.md`](howTo.md).

## Stack

SvelteKit with the static adapter, Svelte 5, Vite, and Markdown news via `marked`.

## License and art

This is a hobby project. Game assets belong to their original owners. Site art is a mix of screenshots, borrowed work, and generated images. If something on the site is yours, see the Stolen Assets page and get in touch.
