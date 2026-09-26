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
| `PUBLIC_GITHUB_TOKEN` | Optional fine-grained PAT (public repo read). Without it, GitHub may show news-discussion authors as anonymous for org members |

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

## Client manifest

Add the 32-byte Ed25519 private seed that matches the launcher's embedded `client-prod-1` public key as the base64-encoded repository Actions secret `CLIENT_MANIFEST_PRIVATE_KEY` in Settings → Secrets and variables → Actions. Keep the private key out of the repository. If you generate a new pair with `sign-manifest keygen`, update the launcher's public key before publishing manifests signed with it.

Add or edit `client.json` in the repository root and push it to `main`. CI signs its exact UTF-8 bytes, commits `client.manifest.json`, and publishes the same manifest at `/client.manifest.json` through the site's `static/` directory. The signing workflow can also be run manually from Actions.

## Stack

SvelteKit with the static adapter, Svelte 5, Vite, and Markdown news via `marked`.

## License and art

This is a hobby project. Game assets belong to their original owners. Site art is a mix of screenshots, borrowed work, and generated images. If something on the site is yours, see the Stolen Assets page and get in touch.
