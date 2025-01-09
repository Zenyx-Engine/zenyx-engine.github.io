import { readFile } from 'fs/promises';
import { join } from 'path';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
  // Read and parse docs.json
  const docsConfig = JSON.parse(
    await readFile(join(process.cwd(), 'docs/docs.json'), 'utf-8')
  );

  return {
    docs: docsConfig.docs,
    currentDoc: docsConfig.docs.find(
      (      doc: { slug: any; }) => url.pathname === `/docs/${doc.slug}`
    )
  };
};