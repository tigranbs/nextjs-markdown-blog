import Image from 'next/image';
import React from "react";
import {marked} from 'marked';
import styles from "../../styles/Home.module.css";
import { getPost, getPosts } from "../../lib/posts";

const BlogPost = (props: {
    frontMatter: { [key: string]: string },
    slug: string,
    content: string,
}) => (
    <div className={styles.container}>
        <div>
            <Image src={props.frontMatter.thumbnail} alt={props.frontMatter.title} width={807} height={166} />
            <div dangerouslySetInnerHTML={{__html: marked(props.content)}}/>
        </div>
    </div>
);

export default BlogPost;

export async function getStaticPaths() {
    const paths = getPosts().map(({slug}) => ({
        params: {
            slug,
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const { frontMatter, content } = getPost(slug)

    return {
        props: {
            frontMatter,
            slug,
            content,
        },
    }
}
