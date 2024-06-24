import type { ReactNode } from "react";
import { getPosts } from "@/lib/contentful";
import Post from "@/components/feed/post";

const RecentPosts = async ({ children }: { children?: ReactNode }) => {
  const { posts } = await getPosts();

  if (!posts?.length) return null;

  return (
    <section data-testid="RecentPosts">
      <h2 className="font-bold mb-4">Recent Posts</h2>
      <div className="flex flex-col gap-4 mb-4">
        {posts.map((post, index) => {
          return <Post key={index} {...post} />;
        })}
      </div>
      {children}
    </section>
  );
};

export default RecentPosts;
