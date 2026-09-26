import DOMPurify from 'dompurify';
import { formatMarkdown } from '$lib/news/posts';

let hooksInstalled = false;

function ensureLinkHooks() {
  if (hooksInstalled || typeof window === 'undefined') return;
  hooksInstalled = true;

  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A') {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

/** Render GitHub discussion Markdown or HTML safely for {@html}. */
export function renderDiscussionBody(body: string): string {
  const trimmed = body.trim();
  if (!trimmed) return '';

  ensureLinkHooks();

  const html = trimmed.startsWith('<')
    ? trimmed
    : (formatMarkdown(trimmed) as string);

  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['target', 'rel']
  });
}
