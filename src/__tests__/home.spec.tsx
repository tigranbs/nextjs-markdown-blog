import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

describe('Home page', () => {
  it('renders post titles and descriptions', () => {
    const posts = [
      {
        slug: 'blog-1',
        frontMatter: {
          title: 'Blog post 1',
          description: 'A first test blog',
        },
      },
    ];

    render(<Home posts={posts} />);

    expect(screen.getByText('Blog post 1')).toBeInTheDocument();
    expect(screen.getByText('A first test blog')).toBeInTheDocument();
  });

  it('renders a link per post slug', () => {
    const posts = [
      {
        slug: 'blog-2',
        frontMatter: {
          title: 'Blog post 2',
          description: 'A second test blog',
        },
      },
    ];

    render(<Home posts={posts} />);

    expect(screen.getByText('Blog post 2')).toBeInTheDocument();
  });
});
