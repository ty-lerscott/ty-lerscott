import { setMetadata } from "@/lib/utils";
import { getPage } from "@/lib/contentful";
import RecentPosts from "@/components/feed/recent-posts";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

const BREADCRUMBS: Breadcrumb[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Posts",
    href: "/posts",
  },
];

export const generateMetadata = async () => {
  const resp = await getPage("posts");

  return setMetadata({
    alternates: {
      canonical: resp.slug,
    },
    title: resp.title,
    keywords: resp.keywords,
    description: resp.description,
  });
};

const Posts = async () => {
  return (
    <>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <h1 className="text-2xl my-4 font-bold">Posts</h1>
      <RecentPosts />
    </>
  );
};

export default Posts;
