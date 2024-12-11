import { marked } from 'marked';
import type { PageServerLoad } from './$types';

export const prerender = 'auto';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  try {
    // Static import approach for docs.json
    // is there a better way to do this? - caz
    const docsConfig = await import('../../../../docs/docs.json');
    const doc = docsConfig.docs.find((d: { slug: string }) => d.slug === slug);

    if (!doc) {
      throw new Error('Document not found');
    }

    // Use import.meta.glob to load markdown files
    const markdownFiles = import.meta.glob('../../../../docs/*.md', { as: 'raw' });
    const markdownImporter = markdownFiles[`../../../../docs/${slug}.md`];
    

    if (!markdownImporter) {
      throw new Error('Markdown file not found');
    }

    const markdown = await markdownImporter();

    const headings: { depth: number; text: string; slug: string }[] = [];
    const tokens = marked.lexer(markdown);
    tokens.forEach(token => {
      if (token.type === 'heading') {
        headings.push({
          depth: token.depth,
          text: token.text,
          slug: token.text.toLowerCase().replace(/[^\w]+/g, '-')
        });
      }
    });

    // Render markdown to HTML
    const content = marked(markdown);

    return {
      doc: {
        ...doc,
        content,
        headings
      }
    };
  } catch (error) {
    console.error('Error loading document:', error);
    throw error;
  }
};
