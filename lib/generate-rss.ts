import { escape } from '@/lib/utils/htmlEscaper';

import siteMetadata from '@/data/siteMetadata';
import { PostFrontMatter } from 'types/PostFrontMatter';

const generateRssItem = (post: PostFrontMatter) => `
  <item>
    <guid>${siteMetadata.url.web}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${siteMetadata.url.web}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${post.tags && post.tags.map(t => `<category>${t}</category>`).join('')}
  </item>
`;

const generateRss = (posts: PostFrontMatter[], module?: string, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.url.web}/${module}</link>
      <description>${escape(siteMetadata.description)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${
  siteMetadata.author
})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${
        siteMetadata.url.web
      }/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`;
export default generateRss;
