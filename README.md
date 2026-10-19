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
| News articles | `src/lib/content/news/` (Markdown; filename is the URL slug, new files are announced in Discord if hook is set up) |
| Changelog | `src/lib/data/changelog.ts` |
| Roadmap | `src/lib/data/roadmap.ts` |
| Feature copy and navigation | `src/lib/data/features.ts`, `src/lib/data/featureNav.ts` |
| Images | `static/art/` (referenced as `/art/...`) |

Step-by-step notes for news, changelog, and roadmap entries are in [`howTo.md`](howTo.md).

## Discord news announcements

The site publishes news as RSS at `/rss.xml`. To announce new posts in Discord, create a webhook in the target channel (Channel settings → Integrations → Webhooks), then add these to the repository:

| Name | Kind | Purpose |
| --- | --- | --- |
| `DISCORD_WEBHOOK_URL` | Actions secret | Webhook the announcement is posted to. Without it the workflow skips and only warns |
| `DISCORD_ROLE_ID` | Actions variable (optional) | Role pinged with each announcement, e.g. `123456789012345678` |

`.github/workflows/announce-news.yml` runs on every push to `main` and posts one embed per newly added file in `src/lib/content/news/` (title, summary, cover image, link, author, category, date). Editing an existing post does not re-announce it. Use the workflow's manual **Run workflow** button with a space-separated file list to re-send a specific post.

Preview the payload locally without posting:

```bash
node scripts/notify-discord.mjs --dry-run src/lib/content/news/my-post.md
```

## Client manifest

Add the 32-byte Ed25519 private seed that matches the launcher's embedded `client-prod-1` public key as the base64-encoded repository Actions secret `CLIENT_MANIFEST_PRIVATE_KEY` in Settings → Secrets and variables → Actions. Keep the private key out of the repository. If you generate a new pair with `sign-manifest keygen`, update the launcher's public key before publishing manifests signed with it.

`client.json` in the repository root is the only manifest input, and it is signed while the site is deployed: the `Deploy to GitHub Pages` workflow runs `scripts/sign-client-manifest.mjs` immediately before `bun run build`, so the build picks up `static/client.manifest.json` and serves it at `/client.manifest.json`. Nothing commits the signed manifest back to `main`, which is what keeps `main` compatible with a ruleset that requires pull requests, and it removes the window where the published manifest and `client.json` disagree.

The signing step is required and fails the deploy when the secret is missing or the key cannot sign, rather than publishing a site whose manifest does not match `client.json`. Since Ed25519 signatures are deterministic, re-deploying an unchanged `client.json` produces a byte-identical manifest.

`client.manifest.json` and `static/client.manifest.json` are build output and are listed in `.gitignore`. To produce them locally, supply the private key:

```bash
CLIENT_MANIFEST_PRIVATE_KEY=... node scripts/sign-client-manifest.mjs
```

### Cleaning up the manifest committed by the old flow

`main` still tracks `client.manifest.json` and `static/client.manifest.json` from when the signing workflow committed them. They are ignored and overwritten now, so remove them once:

```bash
git fetch origin main
git checkout -b drop-committed-manifest origin/main
git rm client.manifest.json static/client.manifest.json
git commit -m "Stop tracking the generated client manifest"
git push origin HEAD
```

Then open the pull request and merge it. Leaving them in place is not harmful - the deploy overwrites the static copy before it is published - but the copies in git would go stale and the launcher should never be pointed at the raw repository file.

## Client download link monitoring

`client.json` points the launcher at the client archive and the map data, both hosted on Google Drive. Those links can quietly stop working - the file is deleted, moved, or unshared - and nothing notices until a player reports a broken download.

`scripts/check-client-files.mjs` walks the manifest for Drive links, requests each one the way the launcher would (`https://drive.google.com/uc?export=download&id=...`) and reports what came back: `404` means the file is gone, `403` or a sign-in redirect means it is restricted, and a transient error is retried `CHECK_ATTEMPTS` times before it counts as broken.

`.github/workflows/check-client-files.yml` runs it daily at 09:17 UTC, on every push that touches `client.json` or the script, on every pull request to `main`, and on demand:

| Trigger | When a link is broken |
| --- | --- |
| Schedule, push, manual | Red Discord embed (pinging `DISCORD_ROLE_ID` if set) |
| Pull request | Failed run with an annotation on the offending line of `client.json`; Discord stays quiet |

To make it gate merges, add the check named **`client downloads reachable`** (the job inside `Client links`; it reads as `Client links / client downloads reachable` on a pull request) next to `bun run build` in Settings → Rules → Rulesets → your ruleset → Require status checks to pass. The PR trigger deliberately has no `paths` filter, because a required check that never runs leaves pull requests stuck on "Expected - waiting for status to be reported".

It reuses the webhook variables from the news announcements:

| Name | Kind | Purpose |
| --- | --- | --- |
| `DISCORD_WEBHOOK_URL` | Actions secret | Already needed for news; the warning is posted here |
| `DISCORD_ALERT_WEBHOOK_URL` | Actions secret (optional) | Use this instead to keep infrastructure warnings out of the public news channel |
| `DISCORD_ROLE_ID` | Actions variable (optional) | Role pinged when a link is broken |

Check the links locally:

```bash
node scripts/check-client-files.mjs client.json --dry-run
```

Flags and variables:

| Flag / variable | Effect |
| --- | --- |
| `--always` / `NOTIFY_ON_SUCCESS=1` | Also post a short message when every link is fine |
| `--no-fail` / `ALLOW_FAILURE=1` | Always exit 0, so a broken link warns in Discord without failing the run |
| `--no-notify` / `NO_NOTIFY=1` | Never post to Discord; the exit code is the only report (what pull requests do) |
| `DRY_RUN=1` | Print the Discord payload instead of posting it |
| `CHECK_TIMEOUT_MS` | Per-request timeout, default `30000` |
| `CHECK_ATTEMPTS` | Attempts per link before reporting it broken, default `3` |

Only reachability is checked. Verifying the declared `sha256` would mean downloading multi-gigabyte archives on every run, so a re-uploaded file still needs its hash updated by hand.

## Stack

SvelteKit with the static adapter, Svelte 5, Vite, and Markdown news via `marked`.

## License and art

This is a hobby project. Game assets belong to their original owners. Site art is a mix of screenshots, borrowed work, and generated images. If something on the site is yours, see the Stolen Assets page and get in touch.
