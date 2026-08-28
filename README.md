# nextjs-markdown-blog

A static site generation (SSG) Markdown blog built with [Next.js](https://nextjs.org/).

## How it works

Markdown posts live in the `posts/` directory, one `*.md` file per post. Each
file contains frontMatter metadata followed by Markdown body content:

- `title` — post title
- `date` — publication date (used to sort posts newest-first)
- `description` — short summary shown on the index list
- `thumbnail` — path to the post's thumbnail image

Post content is read and parsed in `lib/posts.ts`, which consolidates the
logic for reading files, extracting frontMatter, and listing/sorting posts.

### Pages

- `pages/index.tsx` — the index listing, rendering every post and linking to
  its detail page.
- `pages/blog/[slug].tsx` — the per-post renderer, showing the thumbnail,
  title, and rendered Markdown content.

## Commands

```bash
npm run dev     # start the development server (http://localhost:3000)
npm run build   # create a production build
npm run start   # start the production server
npm run lint    # run ESLint
npm run test    # run the Jest test suite
```

## Generated build output

`.next/` (and `/out`, `/build`) are generated build artifacts already covered
by `.gitignore`. They are never committed and are regenerated every time
`npm run build` runs. This is why scans report orphan/duplicated modules under
`.next/` (for example `.next/server/pages/index.js`,
`.next/server/pages/blog/[slug].js`, `.next/server/webpack-runtime.js`, and
`.next/server/chunks/190.js`) whose source counterparts are already
consolidated in `lib/posts.ts`.
