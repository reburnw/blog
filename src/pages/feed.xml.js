import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getPostPath } from '../lib/posts';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: 'Ricardo Wang',
    description: "我的技术分享 | Ricardo's personal blog",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: getPostPath(post),
      categories: post.data.categories,
    })),
  });
}
