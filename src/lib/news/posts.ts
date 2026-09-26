import { marked } from 'marked';

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  author?: string;
  tags?: string;
  image?: string;
  discussion?: string;
  content: string;
};

export type NewsSummary = Omit<NewsPost, 'content'>;

const newsMarkdownFiles = import.meta.glob('../content/news/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

function parseFrontmatter(content: string): { frontmatter: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {
      frontmatter: {},
      content: content.trim()
    };
  }

  const frontmatter: Record<string, string> = {};
  match[1].split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  });

  return {
    frontmatter,
    content: match[2].trim()
  };
}

function getSlugFromPath(path: string): string {
  const filename = path.split('/').pop() ?? '';
  return filename.replace(/\.md$/, '');
}

function titleFromSlug(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeImagePath(value: string | undefined): string | undefined {
  const path = value?.trim();
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return path.startsWith('/') ? path : `/${path}`;
}

function normalizeDiscussion(value: string | undefined): string | undefined {
  const discussion = value?.trim();
  return discussion || undefined;
}

export function absoluteUrl(origin: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${origin.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

export function imageMimeType(path: string): string {
  const ext = path.split('?')[0].split('.').pop()?.toLowerCase();
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg';
  if (ext === 'png') return 'image/png';
  if (ext === 'gif') return 'image/gif';
  if (ext === 'svg') return 'image/svg+xml';
  if (ext === 'avif') return 'image/avif';
  return 'image/webp';
}

export function getAllNewsPosts(): NewsPost[] {
  const posts = Object.entries(newsMarkdownFiles)
    .map(([path, fileContent]) => {
      const slug = getSlugFromPath(path);
      if (slug.startsWith('_')) return null;

      const { frontmatter, content } = parseFrontmatter(fileContent);

      return {
        slug,
        title: frontmatter.title || titleFromSlug(slug),
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        description: frontmatter.description || '',
        category: frontmatter.category || 'Development',
        author: frontmatter.author,
        tags: frontmatter.tags,
        image: normalizeImagePath(frontmatter.image),
        discussion: normalizeDiscussion(frontmatter.discussion),
        content
      } satisfies NewsPost;
    })
    .filter((post): post is NewsPost => post !== null);

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNewsSummaries(): NewsSummary[] {
  return getAllNewsPosts().map(({ content: _content, ...summary }) => summary);
}

export function getNewsPost(slug: string): NewsPost | undefined {
  return getAllNewsPosts().find((post) => post.slug === slug);
}

export function formatNewsDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export type NewsHeading = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

export function stripTitleHeading(content: string, title: string): string {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const headingRegex = new RegExp(`^\\s*#\\s+${escapedTitle}\\s*\\n?`, 'i');
  return content.replace(headingRegex, '').trimStart();
}

export function formatMarkdown(content: string): string {
  return marked.parse(content, { async: false, gfm: true, breaks: true }) as string;
}

function plainTextFromHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function slugifyHeading(text: string): string {
  const slug = text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'section';
}

export function attachHeadingAnchors(html: string): { html: string; headings: NewsHeading[] } {
  const used = new Map<string, number>();
  const headings: NewsHeading[] = [];

  const nextHtml = html.replace(
    /<(h([2-4]))>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, levelStr: string, inner: string) => {
      const text = plainTextFromHtml(inner);
      if (!text) return `<${tag}>${inner}</${tag}>`;

      let id = slugifyHeading(text);
      const seen = used.get(id) ?? 0;
      used.set(id, seen + 1);
      if (seen > 0) id = `${id}-${seen + 1}`;

      headings.push({ id, text, level: Number(levelStr) as 2 | 3 | 4 });
      return `<${tag} id="${id}">${inner}</${tag}>`;
    }
  );

  return { html: nextHtml, headings };
}
