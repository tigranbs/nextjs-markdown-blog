import type { NextPage } from 'next'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { getPosts, Post } from '../lib/posts';

const Home = (props: {
  posts: Post[]
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
  const posts = getPosts()

  return {
    props: {
      posts,
    },
  }
}

export default Home
