// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Define your collection(s)
const blogPosts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    createdAt: z.string().min(1),
    categories: z.array(z.string()),
    author: z.string().min(1),
    lang: z.union([z.literal('it'), z.literal('en')]),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog-posts': blogPosts,
};
