import slugify from 'slugify';

export function createSlug(content: string): string {
  return slugify(content, {
    strict: true,
    trim: true,
    lower: true,
  });
}
