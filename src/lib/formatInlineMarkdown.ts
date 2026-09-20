import { Marked } from 'marked';

const inlineMarkdown = new Marked({
  gfm: true,
  renderer: {
    link({ href, title, text }) {
      const titleAttr = title ? ` title="${escapeAttr(title)}"` : '';
      const extra = /^(https?:)?\/\//i.test(href)
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';
      return `<a href="${escapeAttr(href)}"${titleAttr}${extra}>${text}</a>`;
    }
  }
});

function escapeAttr(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

/** Inline markdown for summaries and item lines (links, emphasis, code). */
export function formatInlineMarkdown(text: string): string {
  return inlineMarkdown.parseInline(text) as string;
}
