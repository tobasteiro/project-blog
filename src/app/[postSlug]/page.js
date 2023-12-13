import React from "react";
import dynamic from "next/dynamic";

import BlogHero from "@/components/BlogHero";

import { loadBlogPost } from "@/helpers/file-helpers";

import { MDXRemote } from "next-mdx-remote/rsc";

import styles from "./postSlug.module.css";
import CodeSnippet from "@/components/CodeSnippet";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);

const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo")
);

export const getBlogPostData = React.cache(
  async (slug) => await loadBlogPost(slug)
);

export async function generateMetadata({ params }) {
  const file = await getBlogPostData(params.postSlug);
  return {
    title: file.frontmatter.title,
    description: file.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const file = await getBlogPostData(params.postSlug);

  let addedSnippets = file.content
    .replaceAll("```js\n", "<CodeSnippet>\n```js\n")
    .replaceAll("```\n", "```\n</CodeSnippet>\n");
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={file.frontmatter.title}
        publishedOn={file.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={addedSnippets}
          components={{ CodeSnippet, DivisionGroupsDemo, CircularColorsDemo }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
