import type { CollectionEntry } from 'astro:content';

export function getPostSlug(post: CollectionEntry<'blog'>) {
  return post.id.replace(/\.(md|markdown)$/i, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function getPostPath(post: CollectionEntry<'blog'>) {
  const date = post.data.date;
  const [category = 'blog', subcategory] = post.data.categories;
  const parts = [
    category,
    subcategory,
    String(date.getFullYear()),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    `${getPostSlug(post)}.html`,
  ];

  return `/${parts.filter(Boolean).join('/')}`;
}
