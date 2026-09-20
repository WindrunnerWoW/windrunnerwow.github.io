import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const base = process.env.BASE_PATH ?? '';
const root = 'build';
const exts = new Set(['.css', '.html', '.js', '.json', '.xml']);

if (!base) {
  process.exit(0);
}

const inner = base.slice(1);

function prefixPath(path) {
  if (!path) return `${base}/`;
  if (
    path === inner ||
    path.startsWith(`${inner}/`) ||
    path.startsWith(`${inner}?`) ||
    path.startsWith(`${inner}#`)
  ) {
    return `/${path}`;
  }
  return `${base}/${path}`;
}

function rewrite(source) {
  return source
    .replace(/href="\/([^"]*)"/g, (_, path) => `href="${prefixPath(path)}"`)
    .replace(/href='\/([^']*)'/g, (_, path) => `href='${prefixPath(path)}'`)
    .replace(/href:\s*'\/([^']*)'/g, (_, path) => `href: '${prefixPath(path)}'`)
    .replace(/href:\s*"\/([^"]*)"/g, (_, path) => `href: "${prefixPath(path)}"`)
    .replace(/ctaHref:\s*"\/([^"]*)"/g, (_, path) => `ctaHref: "${prefixPath(path)}"`)
    .replace(/ctaHref:\s*'\/([^']*)'/g, (_, path) => `ctaHref: '${prefixPath(path)}'`)
    .replace(/src="\/([^"]*)"/g, (_, path) => `src="${prefixPath(path)}"`)
    .replace(/src='\/([^']*)'/g, (_, path) => `src='${prefixPath(path)}'`)
    .replace(/src:\s*'\/([^']*)'/g, (_, path) => `src: '${prefixPath(path)}'`)
    .replace(/src:\s*"\/([^"]*)"/g, (_, path) => `src: "${prefixPath(path)}"`)
    .replace(/(['"`])\/art\//g, `$1${base}/art/`)
    .replace(/url\(\/art\//g, `url(${base}/art/`)
    .replace(/(['"`])\/talents\//g, `$1${base}/talents/`);
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }
    if (!exts.has(extname(name))) continue;
    const before = readFileSync(path, 'utf8');
    const after = rewrite(before);
    if (after !== before) writeFileSync(path, after);
  }
}

walk(root);
