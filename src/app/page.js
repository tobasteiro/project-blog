import React from "react";

import { BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";

export const metadata = {
  title: BLOG_TITLE,
  description: "A wonderful blog about Javascript",
};

async function Home() {
  const blogPosts = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {blogPosts.map((post) => (
        <BlogSummaryCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          abstract={post.abstract}
          publishedOn={post.publishedOn}
        />
      ))}
    </div>
  );
}

export default Home;
