import { getPosts } from '../../lib/posts';

describe('getPosts', () => {
  it('returns a Post for every *.md file in posts/', () => {
    const posts = getPosts();

    expect(posts.length).toBeGreaterThan(0);

    posts.forEach((post) => {
      expect(typeof post.slug).toBe('string');
      expect(post.slug.length).toBeGreaterThan(0);
      expect(post.frontMatter).toBeDefined();
    });
  });

  it('derives slugs from the markdown filenames', () => {
    const posts = getPosts();
    const slugs = posts.map((post) => post.slug).sort();

    expect(slugs).toEqual(['blog-1', 'blog-2', 'blog-3']);
  });

  it('parses frontMatter from each post', () => {
    const posts = getPosts();

    posts.forEach((post) => {
      expect(post.frontMatter.title).toBeDefined();
      expect(post.frontMatter.description).toBeDefined();
      expect(post.frontMatter.date).toBeDefined();
    });
  });

  it('sorts posts by date in descending order', () => {
    const posts = getPosts();
    const dates = posts.map((post) => new Date(post.frontMatter.date).getTime());

    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });

  it('ignores non-markdown files', () => {
    const posts = getPosts();

    posts.forEach((post) => {
      expect(post.slug.endsWith('.md')).toBe(false);
    });
  });
});
