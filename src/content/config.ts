// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Define your collection(s)
const upcomingEvents = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string().nonempty(),
    startsAt: z.string().datetime(),
    speaker: z.string().nonempty(),
    hasCallForPapers: z.boolean(),
  }),
});

const blogPosts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().nonempty(),
    createdAt: z.string().nonempty(),
    categories: z.array(z.string()),
    author: z.string().nonempty(),
    lang: z.union([z.literal('it'), z.literal('en')]),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'upcoming-events': upcomingEvents,
  'blog-posts': blogPosts,
};
