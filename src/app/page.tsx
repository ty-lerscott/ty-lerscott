import { getHomepage } from "@/lib/contentful";
import { Separator } from "@/components/ui/separator";
import RecentPosts from "@/components/feed/recent-posts";

const Home = async () => {
  const page = await getHomepage();

  if (!page) return null;

  return (
    <div data-testid="page-home">
      <section data-testid="blurb" className="flex flex-col gap-4">
        {page.blurb.map((blurb, index) => {
          const Tag = blurb.tag;

          return <Tag key={`blurb-${index}`}>{blurb.text}</Tag>;
        })}
      </section>
      <Separator className="my-8" />
      <RecentPosts />
    </div>
  );
};

export default Home;
