// Checks every Google Drive link in the client manifest and warns in a Discord
// channel when one of them can no longer be downloaded anonymously.
//
// Usage:
//   node scripts/check-client-files.mjs
//   node scripts/check-client-files.mjs client.json --dry-run
//   node scripts/check-client-files.mjs --always --no-fail
//
// Environment:
//   DISCORD_WEBHOOK_URL       Webhook URL of the channel that should get the warning
//   DISCORD_ALERT_WEBHOOK_URL Optional webhook for a monitoring channel; falls back
//                             to DISCORD_WEBHOOK_URL when unset
//   DISCORD_ROLE_ID           Optional role ID pinged when something is broken
//   CHECK_TIMEOUT_MS          Per-request timeout in ms (default 30000)
//   CHECK_ATTEMPTS            Attempts per link before it is reported broken (default 3)
//   NOTIFY_ON_SUCCESS=1       Also post a short message when every link is fine
//   NO_NOTIFY=1               Never post to Discord; the exit code is the only report
//   DRY_RUN=1                 Print the payload instead of posting it
//   ALLOW_FAILURE=1           Never exit non-zero, even when a link is broken
//
// Exit codes: 0 healthy, 1 at least one link is broken, 2 the manifest is unusable.

import { readFileSync } from 'node:fs';

const EMBED_COLOR = 0xc9b06a;
const BROKEN_COLOR = 0xc0392b;
const DOWNLOAD_ENDPOINT = 'https://drive.google.com/uc?export=download';
const READ_LIMIT = 64 * 1024;
const MAX_FIELD_NAME = 256;
const MAX_FIELD_VALUE = 1024;
const MAX_FIELDS = 25;

const STATE_LABELS = {
  missing: '404 Not Found - the file was deleted or the link no longer resolves',
  denied: '403 Forbidden - the file is restricted, so anonymous downloads are refused',
  error: 'request failed'
};

// 404 and 403 are definitive answers from Drive; everything below is worth another try.
const RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  const header = [];
  for (const line of readFileSync(new URL(import.meta.url), 'utf8').split('\n')) {
    if (line.startsWith('//')) {
      header.push(line.replace(/^\/\/ ?/, ''));
      continue;
    }
    if (line.trim() === '') continue;
    break;
  }
  console.log(header.join('\n'));
  process.exit(0);
}

const dryRun = process.env.DRY_RUN === '1' || args.includes('--dry-run');
const always = process.env.NOTIFY_ON_SUCCESS === '1' || args.includes('--always');
const notify = !(process.env.NO_NOTIFY === '1' || args.includes('--no-notify'));
const allowFailure = process.env.ALLOW_FAILURE === '1' || args.includes('--no-fail');
const timeoutMs = Number(process.env.CHECK_TIMEOUT_MS) || 30000;
const attempts = Number(process.env.CHECK_ATTEMPTS) || 3;
const manifestPath = args.find((arg) => !arg.startsWith('-')) ?? 'client.json';

const webhookUrl = (process.env.DISCORD_ALERT_WEBHOOK_URL ?? process.env.DISCORD_WEBHOOK_URL)?.trim();
const roleId = process.env.DISCORD_ROLE_ID?.trim();

function truncate(value, limit) {
  if (!value) return value;
  return value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

function safeHost(value) {
  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

function decodeEntities(value) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

// Returns { kind: 'file', fileId } for a downloadable Drive file, { kind: 'folder' }
// for a folder link, and null for anything else.
function driveTarget(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '');
  if (!['drive.google.com', 'docs.google.com', 'drive.usercontent.google.com'].includes(host)) return null;

  if (url.pathname.includes('/folders/')) return { kind: 'folder' };

  const fromPath = url.pathname.match(/\/d\/([A-Za-z0-9_-]{10,})/);
  if (fromPath) return { kind: 'file', fileId: fromPath[1] };

  const fromQuery = url.searchParams.get('id');
  if (fromQuery && /^[A-Za-z0-9_-]{10,}$/.test(fromQuery)) return { kind: 'file', fileId: fromQuery };

  return null;
}

// Walks the manifest and picks up every Drive link, remembering the surrounding
// displayName/sha256 so a warning can name the file the way the launcher does.
function collectTargets(node, path, context, targets = []) {
  if (Array.isArray(node)) {
    node.forEach((item, index) => collectTargets(item, `${path}[${index}]`, context, targets));
    return targets;
  }

  if (node && typeof node === 'object') {
    const label = typeof node.displayName === 'string' ? node.displayName : context.label;
    const sha256 = typeof node.sha256 === 'string' ? node.sha256.toUpperCase() : context.sha256;
    for (const [key, child] of Object.entries(node)) {
      collectTargets(child, path ? `${path}.${key}` : key, { label, sha256 }, targets);
    }
    return targets;
  }

  if (typeof node !== 'string') return targets;

  const drive = driveTarget(node);
  if (!drive) return targets;

  targets.push({
    path,
    url: node,
    label: context.label ?? path,
    sha256: context.sha256 ?? null,
    ...drive
  });
  return targets;
}

async function readPrefix(response, limit) {
  if (!response.body) return '';

  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;

  try {
    while (size < limit) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      size += value.length;
    }
  } finally {
    await reader.cancel().catch(() => {});
  }

  return Buffer.concat(chunks).toString('utf8');
}

// Large Drive files are not served directly: Google answers with a small HTML
// confirmation page that names the file and its size.
function parseInterstitial(html) {
  const match = html.match(/class="uc-name-size">\s*<a[^>]*>([^<]+)<\/a>\s*(?:\(([^)]+)\))?/);
  if (!match) return null;
  return {
    fileName: decodeEntities(match[1]).trim(),
    fileSize: match[2]?.trim() ?? null
  };
}

async function probe(target) {
  let result;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    result = await probeOnce(target);

    const transient = result.state === 'error' && (result.status === null || RETRY_STATUSES.has(result.status));
    if (!transient || attempt === attempts) break;

    console.log(`  ${target.path}: ${describe(result)}; retrying (${attempt}/${attempts - 1})`);
    await new Promise((resolve) => setTimeout(resolve, 1500 * attempt));
  }

  return result;
}

async function probeOnce(target) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const url = `${DOWNLOAD_ENDPOINT}&id=${encodeURIComponent(target.fileId)}`;

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'windrunner-client-check/1.0' }
    });

    const contentType = response.headers.get('content-type') ?? '';
    const body = response.ok ? await readPrefix(response, READ_LIMIT) : '';
    const host = safeHost(response.url);
    const meta = parseInterstitial(body) ?? {};

    if (response.status === 404) return { state: 'missing', status: response.status, ...meta };
    if (response.status === 403 || host === 'accounts.google.com') {
      return { state: 'denied', status: response.status, ...meta };
    }
    if (!response.ok) {
      return {
        state: 'error',
        status: response.status,
        detail: `HTTP ${response.status} ${response.statusText}`.trim(),
        ...meta
      };
    }

    return {
      state: 'ok',
      status: response.status,
      detail: meta.fileName ? "behind Google's virus-scan confirmation page" : contentType || 'direct download',
      ...meta
    };
  } catch (error) {
    const detail =
      error?.name === 'AbortError' ? `no answer within ${timeoutMs} ms` : (error?.message ?? String(error));
    return { state: 'error', status: null, detail };
  } finally {
    clearTimeout(timer);
  }
}

// GitHub renders these on the Checks tab, pinned to the line of client.json that
// holds the link, so a failing pull request points straight at the bad entry.
function annotate(result) {
  if (process.env.GITHUB_ACTIONS !== 'true') return;

  const line = manifestLines.findIndex((text) => text.includes(result.fileId)) + 1;
  const location = line > 0 ? `file=${manifestPath},line=${line},` : '';
  const title = escapeAnnotation(result.path).replace(/,/g, '%2C').replace(/:/g, '%3A');
  console.log(`::error ${location}title=Broken download link (${title})::${escapeAnnotation(describe(result))}`);
}

function escapeAnnotation(value) {
  return value.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}

function describe(result) {
  if (result.state === 'ok') {
    return [result.fileName ?? 'reachable', result.fileSize ? `(${result.fileSize})` : null].filter(Boolean).join(' ');
  }
  const reason = STATE_LABELS[result.state] ?? STATE_LABELS.error;
  return result.detail ? `${reason} (${result.detail})` : reason;
}

function manifestFooter(manifest, results) {
  const version = [manifest?.product, manifest?.version, manifest?.channel].filter(Boolean).join(' ');
  const reachable = results.filter((result) => result.state === 'ok').length;
  return truncate([version || 'client.json', `${reachable}/${results.length} reachable`, 'Google Drive check'].join(' • '), 2048);
}

function failureField(result) {
  const lines = [
    `**Status:** ${describe(result)}`,
    `**Manifest path:** \`${result.path}\``,
    `**File ID:** \`${result.fileId}\``
  ];

  if (result.sha256) lines.push(`**Manifest sha256:** \`${result.sha256}\``);

  const view = `https://drive.google.com/file/d/${result.fileId}/view`;
  lines.push(`[Open in Google Drive](${view})`);

  return {
    name: truncate(`❌ ${result.label}`, MAX_FIELD_NAME),
    value: truncate(lines.join('\n'), MAX_FIELD_VALUE),
    inline: false
  };
}

function buildEmbed(manifest, results, broken) {
  const hasBroken = broken.length > 0;
  const embed = {
    title: hasBroken
      ? `${broken.length} of ${results.length} client download link(s) are broken`
      : `${results.length} client download link(s) are reachable`,
    color: hasBroken ? BROKEN_COLOR : EMBED_COLOR,
    footer: { text: manifestFooter(manifest, results) },
    timestamp: new Date().toISOString()
  };

  if (hasBroken) {
    embed.description =
      'The launcher can no longer fetch these files from Google Drive. Re-upload the file, share it with ' +
      '"Anyone with the link", then update `client.json` - the declared `sha256` changes with a new upload.';
    embed.fields = broken.slice(0, MAX_FIELDS - (broken.length > MAX_FIELDS ? 1 : 0)).map(failureField);
    if (broken.length > MAX_FIELDS) {
      embed.fields.push({
        name: '…and more',
        value: `${broken.length - embed.fields.length} further broken link(s) were found. See the workflow log.`,
        inline: false
      });
    }
    return embed;
  }

  embed.description = 'Every download listed in `client.json` answers on the public Drive link.';
  embed.fields = results.slice(0, MAX_FIELDS - (results.length > MAX_FIELDS ? 1 : 0)).map((result) => ({
    name: truncate(result.label, MAX_FIELD_NAME),
    value: truncate(`\`${result.path}\` — ${describe(result)}`, MAX_FIELD_VALUE),
    inline: false
  }));
  if (results.length > MAX_FIELDS) {
    embed.fields.push({
      name: '…and more',
      value: `${results.length - embed.fields.length} further link(s) were reachable. See the workflow log.`,
      inline: false
    });
  }
  return embed;
}

async function postToDiscord(payload) {
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

function readManifest(file) {
  let raw;
  try {
    raw = readFileSync(file, 'utf8');
  } catch (error) {
    console.error(`Cannot read ${file}: ${error.message}`);
    process.exit(2);
  }

  try {
    const manifest = JSON.parse(raw);
    if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
      throw new Error('the root of the manifest must be an object');
    }
    return manifest;
  } catch (error) {
    console.error(`Cannot parse ${file}: ${error.message}`);
    process.exit(2);
  }
}

const manifest = readManifest(manifestPath);
const manifestLines = readFileSync(manifestPath, 'utf8').split('\n');
const targets = collectTargets(manifest, '', { label: null, sha256: null });
const files = targets.filter((target) => target.kind === 'file');
const folders = targets.filter((target) => target.kind === 'folder');

if (folders.length > 0) {
  console.log(`Skipping ${folders.length} Drive folder link(s): only file links can be probed anonymously.`);
}

if (files.length === 0) {
  console.error(`No Google Drive file links found in ${manifestPath}.`);
  process.exit(2);
}

console.log(`Checking ${files.length} Drive link(s) from ${manifestPath} (${manifest.product ?? 'unknown product'} ${manifest.version ?? ''}).`.trim());

// One request per unique file ID; a link repeated under several manifest paths
// still gets its own line so the warning names every place that needs fixing.
const cache = new Map();
const results = [];

for (const target of files) {
  if (!cache.has(target.fileId)) cache.set(target.fileId, probe(target));
  results.push({ ...target, ...(await cache.get(target.fileId)) });
}

for (const result of results) {
  const status = result.state === 'ok' ? 'OK    ' : 'BROKEN';
  console.log(`${status} ${result.path.padEnd(28)} ${describe(result)}`);
  if (result.state !== 'ok') annotate(result);
}

const broken = results.filter((result) => result.state !== 'ok');
const payload = { embeds: [buildEmbed(manifest, results, broken)] };
if (broken.length > 0 && roleId) payload.content = `<@&${roleId}>`;

if (broken.length === 0 && !always) {
  console.log('All links reachable; nothing to announce.');
  process.exit(0);
}

if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
} else if (!notify) {
  console.log('Notification disabled (--no-notify); reporting through the exit code only.');
} else if (!webhookUrl) {
  console.log('::warning::Neither DISCORD_ALERT_WEBHOOK_URL nor DISCORD_WEBHOOK_URL is set; checked the links but could not warn in Discord.');
} else {
  await postToDiscord(payload);
  console.log(broken.length > 0 ? `Posted ${broken.length} broken link(s) to Discord.` : 'Posted the all-clear to Discord.');
}

process.exit(broken.length > 0 && !allowFailure ? 1 : 0);
