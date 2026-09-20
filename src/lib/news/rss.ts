import {
  absoluteUrl,
  formatMarkdown,
  getAllNewsPosts,
  imageMimeType,
  stripTitleHeading
} from './posts';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function rfc822(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return new Date().toUTCString();
  return date.toUTCString();
}

function absolutize(html: string, origin: string): string {
  return html.replace(/(src|href)="(\/[^"]*)"/g, `$1="${origin}$2"`);
}

function cdata(html: string): string {
  return html.replace(/]]>/g, ']]]]><![CDATA[>');
}

export function buildNewsRss(origin: string): string {
  const site = origin.replace(/\/$/, '');
  const posts = getAllNewsPosts();
  const lastBuild = posts[0] ? rfc822(posts[0].date) : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = `${site}/news/${post.slug}`;
      const html = absolutize(formatMarkdown(stripTitleHeading(post.content, post.title)), site);
      const author = post.author ? `\n      <author>${escapeXml(post.author)}</author>` : '';
      const category = post.category ? `\n      <category>${escapeXml(post.category)}</category>` : '';
      const imageUrl = post.image ? absoluteUrl(site, post.image) : '';
      const imageType = post.image ? imageMimeType(post.image) : '';
      const imageTags = imageUrl
        ? `\n      <enclosure url="${escapeXml(imageUrl)}" type="${escapeXml(imageType)}" length="0"/>\n      <media:content url="${escapeXml(imageUrl)}" medium="image" type="${escapeXml(imageType)}"/>\n      <media:thumbnail url="${escapeXml(imageUrl)}"/>`
        : '';
      const coverHtml = imageUrl
        ? `<p><img src="${imageUrl}" alt="${escapeXml(post.title)}" /></p>`
        : '';

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>${category}${author}${imageTags}
      <description>${escapeXml(post.description)}</description>
      <content:encoded><![CDATA[${coverHtml}${cdata(html)}]]></content:encoded>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Windrunner News</title>
    <link>${escapeXml(site)}/news</link>
    <description>Development updates, patch notes, and design previews for Windrunner.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(site)}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}
