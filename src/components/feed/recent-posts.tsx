import type { ReactNode } from "react";
import { getPosts } from "@/lib/contentful";
import Post from "@/components/feed/post";
import Header from "@/components/component-map/header";

import styles from "./styles.module.css";

const RecentPosts = async ({ children }: { children?: ReactNode }) => {
  const { posts } = await getPosts();

  if (!posts?.length) return null;

  return (
    <section data-testid="RecentPosts">
      <Header header="Recent Posts" className="mb-4" tag="h1" />
      <div className={styles.Posts}>
        {posts.map((post, index) => {
          return <Post key={index} {...post} />;
        })}
      </div>
      {children}
    </section>
  );
};

export default RecentPosts;
