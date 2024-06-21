import { type PostType } from "@/types/contentful.types";

const Post = ({ title }) => {
  return <div>Post: {title}</div>;
};
const RecentPosts = ({ posts }: { posts: Array<PostType> }) => {
  // console.log(posts);
  if (!posts.length) return null;

  return (
    <section data-testid="RecentPosts">
      <h2 className="font-bold mb-4">Recent Posts</h2>
      {posts.map((post) => {
        return <Post key={post.title} title={post.title} />;
      })}
    </section>
  );
};

export default RecentPosts;
