import { cache } from "react";
import { cn, setMetadata } from "@/lib/utils";
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
      <section data-testid="blurb" className="flex flex-col gap-4">
        {(page.body || []).map((item) => {
          const props = item as TextType;

          return (
            <Text
              {...props}
              key={`blurb-${props.text}`}
              className={cn(/^h[123456]/i.test(props.tag) ? "" : "text-sm")}
            />
          );
        })}
      </section>

      <Separator />

      <RecentPosts>
        <div className="flex justify-center mt-8">
          <Link href="/posts" className="p-1 text-sm" text="All Posts &gt;" />
        </div>
      </RecentPosts>
    </div>
  );
};

export default Home;
