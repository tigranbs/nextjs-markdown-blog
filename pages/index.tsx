import type { NextPage } from 'next'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import matter from 'gray-matter';
import fs from "fs";
import path from "path";

const Home = (props: {
  posts: [{
    slug: string,
    frontMatter: { [key: string]: string }
  }]
}) => {
  return (
    <div className={styles.container}>
      {props.posts.map(({slug, frontMatter: {title, description}}) => (
          <Link key={slug} href={`/blog/${slug}`} passHref>
            <a>
              <h5>{title}</h5>
              <p>{description}</p>
              <hr />
            </a>
          </Link>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.filter(filename => filename.includes(".md")).map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
        path.join('posts', filename),
        'utf-8'
    )

    const {data: frontMatter} = matter(markdownWithMeta)

    return {
      slug,
      frontMatter,
    }
  }).sort((a, b) => (
      new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
  ));

  return {
    props: {
      posts,
    },
  }
}

export default Home
