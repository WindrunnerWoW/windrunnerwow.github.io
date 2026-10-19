// Announces newly published news posts in Discord via a channel webhook.
//
// Usage:
//   node scripts/notify-discord.mjs changed-posts.txt
//   node scripts/notify-discord.mjs --dry-run src/lib/content/news/my-post.md
//
// Environment:
//   DISCORD_WEBHOOK_URL  Webhook URL from the target Discord channel (required unless --dry-run)
//   DISCORD_ROLE_ID      Optional role ID to ping with each announcement
//   PUBLIC_SITE_URL      Canonical origin; defaults to the live site
//   BASE_PATH            Subpath the site is served from, if any

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const EMBED_COLOR = 0xc9b06a;
const MAX_TITLE = 256;
const MAX_DESCRIPTION = 4096;
const MAX_AUTHOR = 256;
const MAX_FOOTER = 2048;

const args = process.argv.slice(2);
const dryRun = process.env.DRY_RUN === '1' || args.includes('--dry-run');
const inputs = args.filter((arg) => arg !== '--dry-run');

const webhookUrl = process.env.DISCORD_WEBHOOK_URL?.trim();
if (!dryRun && !webhookUrl) {
  console.error('DISCORD_WEBHOOK_URL is not set. Nothing to do.');
  process.exit(1);
}

const origin = (process.env.PUBLIC_SITE_URL || 'https://windrunnerwow.github.io').replace(/\/+$/, '');
const base = normalizeBase(process.env.BASE_PATH);
const site = `${origin}${base}`;
const roleId = process.env.DISCORD_ROLE_ID?.trim();

function normalizeBase(value) {
  const trimmed = value?.trim() ?? '';
  if (!trimmed || trimmed === '/') return '';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
}

function truncate(value, limit) {
  if (!value) return value;
  return value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

function parseFrontmatter(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return {};

  const data = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator <= 0) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return data;
}

function absoluteUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${site}${path.startsWith('/') ? path : `/${path}`}`;
}

function readPostList(files) {
  const paths = new Set();

  for (const file of files) {
    if (!file) continue;

    if (file.endsWith('.txt')) {
      const contents = readFileSync(file, 'utf8');
      for (const line of contents.split('\n')) {
        const path = line.trim();
        if (path) paths.add(path);
      }
      continue;
    }

    paths.add(file.trim());
  }

  return [...paths];
}

function buildEmbed(file) {
  const slug = basename(file, '.md');
  if (slug.startsWith('_')) return null;

  const frontmatter = parseFrontmatter(readFileSync(file, 'utf8'));
  const title = truncate(frontmatter.title || slug, MAX_TITLE);
  const link = `${site}/news/${slug}`;

  const embed = {
    title,
    url: link,
    color: EMBED_COLOR
  };

  if (frontmatter.description) {
    embed.description = truncate(frontmatter.description, MAX_DESCRIPTION);
  }

  if (frontmatter.author) {
    embed.author = { name: truncate(frontmatter.author, MAX_AUTHOR) };
  }

  const footer = [frontmatter.category, 'Windrunner News'].filter(Boolean).join(' • ');
  if (footer) {
    embed.footer = { text: truncate(footer, MAX_FOOTER) };
  }

  const date = new Date(frontmatter.date);
  if (!Number.isNaN(date.getTime())) {
    embed.timestamp = date.toISOString();
  }

  if (frontmatter.image) {
    embed.image = { url: absoluteUrl(frontmatter.image.trim()) };
  }

  return embed;
}

async function postToDiscord(embed) {
  const payload = { embeds: [embed] };
  if (roleId) payload.content = `<@&${roleId}>`;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Discord responded ${response.status}: ${body}`);
  }
}

const files = readPostList(inputs);
if (files.length === 0) {
  console.log('No new news posts to announce.');
  process.exit(0);
}

let announced = 0;
for (const file of files) {
  const embed = buildEmbed(file);
  if (!embed) {
    console.log(`Skipping ${file} (template or partial).`);
    continue;
  }

  if (dryRun) {
    console.log(JSON.stringify({ content: roleId ? `<@&${roleId}>` : undefined, embeds: [embed] }, null, 2));
  } else {
    await postToDiscord(embed);
    console.log(`Announced ${embed.url}`);
  }

  announced += 1;
}

console.log(`${dryRun ? 'Would announce' : 'Announced'} ${announced} post(s).`);
