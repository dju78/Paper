import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const publicationsDirectory = path.join(process.cwd(), 'content/publications');

export interface Publication {
  slug: string;
  title: string;
  year: number;
  type: string;
  topics: string[];
  doi?: string;
  journal?: string;
  pdf?: string;
  external_url?: string;
  citation_bibtex?: string;
  citation_apa?: string;
  abstract: string;
  contentHtml: string;
}

export async function getAllPublications(): Promise<Publication[]> {
  const fileNames = fs.readdirSync(publicationsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(publicationsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const matterResult = matter(fileContents);
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      return {
        slug,
        contentHtml,
        ...matterResult.data,
      } as Publication;
    })
  );

  return allPostsData.sort((a, b) => (a.year < b.year ? 1 : -1));
}

export async function getPublicationData(slug: string): Promise<Publication> {
  const fullPath = path.join(publicationsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...matterResult.data,
  } as Publication;
}
