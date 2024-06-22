import { getHomepage } from "@/lib/contentful";
import { cache } from "react";
import { Separator } from "@/components/ui/separator";
import RecentPosts from "@/components/feed/recent-posts";

const getData = cache(async () => {
  return getHomepage();
});

export const generateMetadata = async () => {
  const resp = await getData();

  return {
    metadataBase: new URL("https://ty-lerscott.com"),
    alternates: {
      canonical: "/",
    },
    title: resp.title,
    description: resp.description,
    keywords: [],
    authors: [{ name: "Tyler Scott" }],
    creator: "Tyler Scott",
  };
};

const Home = async () => {
  const page = await getData();

  if (!page) return null;

  return (
    <div data-testid="page-home">
      <section data-testid="blurb" className="flex flex-col gap-4">
        {(page.blurb || []).map((blurb, index) => {
          const Tag = blurb.tag;

          return (
            <Tag key={`blurb-${index}`} className="text-sm">
              {blurb.text}
            </Tag>
          );
        })}
      </section>

      <Separator className="my-8" />

      <RecentPosts posts={page.posts} />
    </div>
  );
};

export default Home;
