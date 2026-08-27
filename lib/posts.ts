import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  frontMatter: { [key: string]: string };
};

function readPostFile(filename: string) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', filename),
    'utf-8'
  )

  return matter(markdownWithMeta)
}

export function getPost(slug: string): Post & { content: string } {
  const { data: frontMatter, content } = readPostFile(slug + '.md')

  return {
    slug,
    frontMatter,
    content,
  }
}

export function getPosts(): Post[] {
  const files = fs.readdirSync(path.join('posts'))

  return files.filter(filename => filename.includes(".md")).map((filename) => {
    const slug = filename.replace('.md', '')

    const {data: frontMatter} = readPostFile(filename)

    return {
      slug,
      frontMatter,
    }
  }).sort((a, b) => (
    new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  ));
}
