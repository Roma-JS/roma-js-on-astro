import {
  ascendingCreatedAtComparator,
  getBlogPostLink,
  sortPosts,
} from 'utils/blog';
import { getCollection } from 'astro:content';

export interface PostInfoDto {
  frontmatter: {
    title: string;
    categories: string[];
    lang: string;
    createdAt: string;
    author: string;
  };
  url: string;
  markdown: string | null;
}

export async function GET() {
  const posts = sortPosts(
    await getCollection('blog-posts'),
    ascendingCreatedAtComparator
  );

  return new Response(
    JSON.stringify(
      posts.map(
        (post): PostInfoDto => ({
          frontmatter: {
            title: post.data.title,
            categories: post.data.categories,
            lang: post.data.lang,
            createdAt: post.data.createdAt,
            author: post.data.author,
          },
          url: getBlogPostLink(post),
          markdown: post.body ?? null,
        })
      )
    )
  );
}
