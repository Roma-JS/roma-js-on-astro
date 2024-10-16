import type { AboutContent, AboutInfo } from '../../../@types/about';
import type { MarkdownInstance } from 'astro';

type Content = MarkdownInstance<AboutInfo>;

export async function getItAboutContent(): Promise<Readonly<AboutContent>> {
  const info = await import.meta.glob('../../*/about.md');
  const content = (await info['../../it/about.md']()) as Content;

  return { ...content.frontmatter, content: content.compiledContent() };
}

export async function GET() {
  return new Response(JSON.stringify(await getItAboutContent()));
}
