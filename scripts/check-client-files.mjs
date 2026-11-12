// Checks every download link in the client manifest and warns in a Discord
// channel when one of them can no longer be fetched anonymously.
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
const DRIVE_DOWNLOAD_ENDPOINT = 'https://drive.google.com/uc?export=download';
const READ_LIMIT = 64 * 1024;
const MAX_FIELD_NAME = 256;
const MAX_FIELD_VALUE = 1024;
const MAX_FIELDS = 25;

const STATE_LABELS = {
  missing: '404 Not Found - the file was deleted or the link no longer resolves',
  expired: '410 Gone - the signed link has expired, so a fresh one has to be generated',
  denied: '403 Forbidden - the link is refused, so the file is restricted or the signature is wrong',
  error: 'request failed'
};

// 404, 403 and 410 are definitive answers from the host; everything below is worth another try.
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

// Returns { kind: 'file', fileId, probeUrl } for a link the launcher downloads,
// { kind: 'folder' } for a Drive folder link, and null for anything else.
function downloadTarget(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

  const host = url.hostname.replace(/^www\./, '');

  // A Drive view link is not downloadable as it stands, so the launcher swaps it
  // for the direct download endpoint before it fetches anything.
  if (['drive.google.com', 'docs.google.com', 'drive.usercontent.google.com'].includes(host)) {
    if (url.pathname.includes('/folders/')) return { kind: 'folder' };

    const fromPath = url.pathname.match(/\/d\/([A-Za-z0-9_-]{10,})/);
    const fromQuery = url.searchParams.get('id');
    const fileId = fromPath?.[1] ?? (fromQuery && /^[A-Za-z0-9_-]{10,}$/.test(fromQuery) ? fromQuery : null);
    if (!fileId) return null;

    return {
      kind: 'file',
      fileId,
      probeUrl: `${DRIVE_DOWNLOAD_ENDPOINT}&id=${encodeURIComponent(fileId)}`
    };
  }

  // Every other host is fetched exactly as the manifest declares it, signed
  // query string and all.
  const fileId = url.pathname.match(/\/d\/([A-Za-z0-9_-]{6,})/)?.[1] ?? null;
  return { kind: 'file', fileId, probeUrl: url.href };
}

// Walks the manifest and picks up every download link, remembering the surrounding
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

  const target = downloadTarget(node);
  if (!target) return targets;

  targets.push({
    path,
    url: node,
    label: context.label ?? path,
    sha256: context.sha256 ?? null,
    ...target
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

function parseFileName(header) {
  if (!header) return null;

  const encoded = header.match(/filename\*=UTF-8''([^;]+)/i);
  if (encoded) {
    try {
      return decodeURIComponent(encoded[1].trim());
    } catch {
      return encoded[1].trim();
    }
  }

  const plain = header.match(/filename="?([^";]+)"?/i);
  return plain ? plain[1].trim() : null;
}

// A ranged answer carries the size of the whole file in Content-Range: "bytes 0-0/1234567890".
function parseContentRange(header) {
  const match = header?.match(/\/(\d+)\s*$/);
  return match ? formatBytes(Number(match[1])) : null;
}

function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unit = 0;

  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }

  return `${unit === 0 || size >= 10 ? Math.round(size) : size.toFixed(1)} ${units[unit]}`;
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

  try {
    const response = await fetch(target.probeUrl, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'windrunner-client-check/1.0',
        // A single byte proves the file is served; without it a healthy link
        // would pull the whole multi-gigabyte archive down.
        range: 'bytes=0-0'
      }
    });

    const contentType = response.headers.get('content-type') ?? '';
    const body = await readPrefix(response, READ_LIMIT);
    const host = safeHost(response.url);
    const interstitial = parseInterstitial(body);
    const meta = {
      fileName: parseFileName(response.headers.get('content-disposition')) ?? interstitial?.fileName ?? null,
      fileSize: parseContentRange(response.headers.get('content-range')) ?? interstitial?.fileSize ?? null
    };

    if (response.status === 404) return { state: 'missing', status: response.status, ...meta };
    if (response.status === 410) return { state: 'expired', status: response.status, ...meta };
    if (response.status === 401 || response.status === 403 || host === 'accounts.google.com') {
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
      detail: interstitial ? "behind Google's virus-scan confirmation page" : contentType || 'direct download',
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

  const needle = result.fileId ?? result.url;
  const line = manifestLines.findIndex((text) => text.includes(needle)) + 1;
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
  return truncate([version || 'client.json', `${reachable}/${results.length} reachable`, 'download link check'].join(' • '), 2048);
}

function failureField(result) {
  const lines = [
    `**Status:** ${describe(result)}`,
    `**Manifest path:** \`${result.path}\``
  ];

  if (result.fileId) lines.push(`**File ID:** \`${result.fileId}\``);
  if (result.sha256) lines.push(`**Manifest sha256:** \`${result.sha256}\``);

  lines.push(`[Open the download link](${result.url})`);

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
      'The launcher can no longer fetch these files. Generate a fresh download link, then update ' +
      '`client.json` - the declared `sha256` changes with a new upload.';
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

  embed.description = 'Every download listed in `client.json` answers on its public link.';
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
  console.error(`No download links found in ${manifestPath}.`);
  process.exit(2);
}

console.log(`Checking ${files.length} download link(s) from ${manifestPath} (${manifest.product ?? 'unknown product'} ${manifest.version ?? ''}).`.trim());

// One request per unique URL; a link repeated under several manifest paths
// still gets its own line so the warning names every place that needs fixing.
const cache = new Map();
const results = [];

for (const target of files) {
  if (!cache.has(target.probeUrl)) cache.set(target.probeUrl, probe(target));
  results.push({ ...target, ...(await cache.get(target.probeUrl)) });
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
