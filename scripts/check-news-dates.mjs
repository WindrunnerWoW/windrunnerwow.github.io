// Fails when a news article has a malformed date or a date in the future, because
// the site publishes every Markdown file in src/lib/content/news immediately and
// sorts the news list by that date.
//
// Usage:
//   node scripts/check-news-dates.mjs
//   node scripts/check-news-dates.mjs src/lib/content/news
//   node scripts/check-news-dates.mjs --today 2026-10-30
//   node scripts/check-news-dates.mjs --no-fail
//
// Environment:
//   ALLOW_FAILURE=1  Report problems but exit 0
//
// Files starting with "_" (the template) are not published and are skipped.
// Dates are calendar days in UTC; a post dated today is allowed.
//
// Exit codes: 0 every date is valid and not in the future, 1 at least one post
// has a future or malformed date, 2 the news directory is unusable.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

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

let hasTodayArg = false;
let todayArg;
const positional = [];

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg === '--today') {
    hasTodayArg = true;
    todayArg = args[index + 1];
    index += 1;
    continue;
  }
  if (arg.startsWith('-')) continue;
  positional.push(arg);
}

const newsDir = positional[0] ?? 'src/lib/content/news';
const allowFailure = process.env.ALLOW_FAILURE === '1' || args.includes('--no-fail');
const today = parseDate(hasTodayArg ? todayArg : new Date().toISOString().slice(0, 10));

if (!today) {
  console.error(`Invalid --today value "${todayArg}". Expected a real date in YYYY-MM-DD format.`);
  process.exit(2);
}

// Returns the date unchanged when it is a real calendar day, otherwise null.
// new Date('2026-02-31') silently rolls over to March, so the components are
// compared back against the input.
function parseDate(value) {
  if (!DATE_PATTERN.test(value)) return null;

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const real =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  return real ? value : null;
}

function parseFrontmatter(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!match) return null;

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

function dateLine(lines) {
  const index = lines.findIndex((line) => /^\s*date\s*:/.test(line));
  return index === -1 ? 1 : index + 1;
}

function escapeAnnotation(value) {
  return value.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}

// GitHub renders this on the Checks tab, pinned to the offending date line.
function annotate(file, line, message) {
  if (process.env.GITHUB_ACTIONS !== 'true') return;

  const title = escapeAnnotation('Invalid news date').replace(/,/g, '%2C').replace(/:/g, '%3A');
  console.log(`::error file=${file},line=${line},title=${title}::${escapeAnnotation(message)}`);
}

function pluralDays(days) {
  return `${days} day${days === 1 ? '' : 's'}`;
}

let names;
try {
  names = readdirSync(newsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_'))
    .map((entry) => entry.name)
    .sort();
} catch (error) {
  console.error(`Cannot read ${newsDir}: ${error.message}`);
  process.exit(2);
}

if (names.length === 0) {
  console.error(`No publishable news posts found in ${newsDir}.`);
  process.exit(2);
}

let problems = 0;

for (const name of names) {
  const file = join(newsDir, name);
  const source = readFileSync(file, 'utf8');
  const line = dateLine(source.split('\n'));
  const frontmatter = parseFrontmatter(source);
  const raw = frontmatter?.date;

  if (!raw) {
    problems += 1;
    console.log(`MISSING ${file}:${line} no date in frontmatter`);
    annotate(file, line, 'News post has no `date` in its frontmatter. Add one in YYYY-MM-DD format.');
    continue;
  }

  const date = parseDate(raw);

  if (!date) {
    problems += 1;
    console.log(`INVALID ${file}:${line} "${raw}" is not a valid YYYY-MM-DD date`);
    annotate(file, line, `News post date "${raw}" is not a valid YYYY-MM-DD date.`);
    continue;
  }

  if (date > today) {
    const days = Math.round((Date.parse(date) - Date.parse(today)) / DAY_MS);
    problems += 1;
    console.log(`FUTURE  ${file}:${line} ${date} is ${pluralDays(days)} in the future (today is ${today} UTC)`);
    annotate(
      file,
      line,
      `News post date ${date} is ${pluralDays(days)} in the future (today is ${today} UTC). ` +
        'The site publishes articles immediately, so a future date is almost certainly a typo.'
    );
    continue;
  }

  console.log(`OK      ${file}:${line} ${date}`);
}

if (problems === 0) {
  console.log(`All ${names.length} news dates are valid and not in the future (today is ${today} UTC).`);
  process.exit(0);
}

console.error(`${problems} of ${names.length} news post(s) have an invalid or future date.`);
process.exit(allowFailure ? 0 : 1);
