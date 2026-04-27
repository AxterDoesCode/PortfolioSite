import { getPosts } from '../posts/get-posts.js';

const CONFIG = {
  title: 'Alex Chau',
  siteUrl: 'https://alexchau.co.uk',
  description: "Alex Chau's blog",
  lang: 'en-gb',
};

const escapeXml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export async function GET() {
  const posts = await getPosts();

  const items = posts
    .map((post) => {
      const fm = post.frontMatter;
      const url = `${CONFIG.siteUrl}${post.route}`;
      const categories = (fm.tags ?? [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');
      return `    <item>
      <title>${escapeXml(fm.title ?? post.name)}</title>
      <description>${escapeXml(fm.description ?? '')}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(fm.date).toUTCString()}</pubDate>
${categories}
${fm.author ? `      <dc:creator>${escapeXml(fm.author)}</dc:creator>` : ''}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(CONFIG.title)}</title>
    <link>${CONFIG.siteUrl}</link>
    <description>${escapeXml(CONFIG.description)}</description>
    <language>${CONFIG.lang}</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
