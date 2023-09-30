import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getBlogPostLink, sortPosts } from 'utils/blog';

export async function GET() {
  const blogPosts = sortPosts(await getCollection('blog-posts'));

  return rss({
    title: 'RomaJS blog',
    description:
      'RomaJS è una comunity di sviluppatori javascript. Con questo feed potrai rimanere aggiornato sui prossimi appuntamenti e potrai leggere il prima possibile i nostri blog posts!',
    site: import.meta.env.PUBLIC_SITE_URL,
    stylesheet: import.meta.env.PUBLIC_URL_BASE + '/assets/pretty-feed-v3.xsl',
    items: blogPosts.map((blogPost) => ({
      title: blogPost.data.title,
      pubDate: new Date(blogPost.data.createdAt),
      description: blogPost.data.author,
      author: blogPost.data.author,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: getBlogPostLink(blogPost),
    })),
  });
}
