import rss from '@astrojs/rss';
import { sortPosts } from 'utils/blog';

const postImportResult = import.meta.globEager('./post/**/*.md');
const posts = sortPosts(Object.values(postImportResult) as any);

export const get = () =>
  rss({
    title: 'RomaJS blog',
    description:
      'RomaJS è una comunity di sviluppatori javascript. Con questo feed potrai rimanere aggiornato sui prossimi appuntamenti e potrai leggere il prima possibile i nostri blog posts!',
    site: import.meta.env.PUBLIC_SITE_URL,
    stylesheet: import.meta.env.PUBLIC_URL_BASE + '/assets/pretty-feed-v3.xsl',
    items: posts.map((post) => ({
      link: post.url as string,
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.createdAt),
    })),
  });
