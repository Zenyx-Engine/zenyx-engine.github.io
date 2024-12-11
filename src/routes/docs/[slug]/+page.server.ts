import { readFile } from 'fs/promises';
import { join } from 'path';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';
export const prerender = 'auto';
export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;
  
  // Read and parse docs.json
  const docsConfig = JSON.parse(
    await readFile(join(process.cwd(), 'docs/docs.json'), 'utf-8')
  );
  
  const doc = docsConfig.docs.find((d: { slug: string; }) => d.slug === slug);
  if (!doc) {
    throw new Error('Document not found');
  }
  
  // Read and parse markdown file
  const markdown = await readFile(
    join(process.cwd(), 'docs', `${slug}.md`),
    'utf-8'
  );
  
  // Parse markdown and extract headings
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
};