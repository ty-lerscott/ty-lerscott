import Link from "next/link";
import { cache } from "react";
import { setMetadata } from "@/lib/utils";
import { getPage } from "@/lib/contentful";
import Text from "@/components/component-map/text";
import { Separator } from "@/components/ui/separator";
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
    <div data-testid="page-home">
      <section data-testid="blurb" className="flex flex-col gap-2">
        {(page.body || []).map(({ text, tag }: TextType) => {
          return (
            <Text className="text-sm" tag={tag} key={`blurb-${text}`}>
              {text}
            </Text>
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
