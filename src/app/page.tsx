import { cache } from "react";
import { getHomepage } from "@/lib/contentful";
import { Separator } from "@/components/ui/separator";
import RecentPosts from "@/components/feed/recent-posts";
import Link from "next/link";

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
      <section data-testid="blurb" className="flex flex-col gap-2">
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

      <RecentPosts>
        <div className="flex justify-center">
          <Link href="/posts" className="p-1 text-sm">
            All Posts &gt;
          </Link>
        </div>
      </RecentPosts>
    </div>
  );
};

export default Home;
