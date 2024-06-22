import dayjs from "dayjs";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa6";
import { type PostType } from "@/types/contentful.types";

const Post = ({
  title,
  publishDate,
  description,
  slug,
}: PostType["fields"]) => {
  return (
    <div data-testid="Post" className="flex flex-col gap-1">
      <h2>
        <Link href={`/posts/${slug}`} className="py-1 pr-1">
          {title}
        </Link>
      </h2>
      <div className="flex items-center gap-2">
        <FaRegCalendar />
        <span className="italic text-sm">
          {dayjs(publishDate).format("MMMM D, YYYY | HH:mm a")}
        </span>
      </div>
      <p className="leading-4 text-sm">{description}</p>
    </div>
  );
};

const RecentPosts = ({ posts }: { posts: PostType["fields"][] }) => {
  if (!posts.length) return null;

  return (
    <section data-testid="RecentPosts" className="pb-8">
      <h2 className="font-bold mb-4">Recent Posts</h2>
      <div className="flex flex-col gap-4 mb-4">
        {posts.map((post) => {
          return <Post key={post.title} {...post} />;
        })}
      </div>
      <div className="flex justify-center">
        <Link href="/posts" className="p-1 text-sm">
          All Posts &gt;
        </Link>
      </div>
    </section>
  );
};

export default RecentPosts;
