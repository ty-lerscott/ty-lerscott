import { cache } from "react";
import { setMetadata } from "@/lib/utils";
import { getPage } from "@/lib/contentful";
import Separator from "@/components/ui/separator";
import Link from "@/components/component-map/link";
import Text from "@/components/component-map/text";
import RecentPosts from "@/components/feed/recent-posts";
import type { Text as TextType } from "@/types/generics.types";

const getData = cache(async () => getPage("home"));

export const generateMetadata = async () => {
  const resp = await getData();

  return setMetadata({
    title: resp.title,
    keywords: resp.keywords,
    description: resp.description,
  });
};

const Home = async () => {
  const page = await getData();

  if (!page) return null;

  return (
    <div data-testid="Page-Home">
      <section data-testid="blurb" className="flex flex-col gap-2">
        {(page.body || []).map((item) => {
          const { tag, text } = item as TextType;

          return (
            <Text
              tag={tag}
              text={text}
              className="text-sm"
              key={`blurb-${text}`}
            />
          );
        })}
      </section>

      <Separator className="my-8" />

      <RecentPosts>
        <div className="flex justify-center">
          <Link href="/posts" className="p-1 text-sm" text="All Posts &gt;" />
        </div>
      </RecentPosts>
    </div>
  );
};

export default Home;
