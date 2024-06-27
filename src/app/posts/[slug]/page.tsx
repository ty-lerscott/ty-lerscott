import dayjs from "dayjs";
import { cache } from "react";
import Tags from "@/components/tags";
import { setMetadata } from "@/lib/utils";
import { getPost } from "@/lib/contentful";
import { FaRegCalendar } from "react-icons/fa6";
import Separator from "@/components/ui/separator";
import { PageParams } from "@/types/generics.types";
import ComponentMap from "@/components/component-map";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

const getData = cache(async (slug: string) => getPost(slug));

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

export const generateMetadata = async ({ params: { slug } }: PageParams) => {
  const resp = await getData(slug);

  return setMetadata({
    alternates: {
      canonical: `/posts/${resp.slug}`,
    },
    title: resp.title,
    keywords: resp.keywords,
    description: resp.description,
  });
};

const Post = async ({ params: { slug } }: PageParams) => {
  const { title, publishDate, image, tags, body } = await getData(slug);

  return (
    <div data-testid="Page-Post">
      <Breadcrumbs breadcrumbs={BREADCRUMBS.concat({ title, href: slug })} />

      <h1 className="text-2xl mt-4 font-bold">{title}</h1>

      <div className="flex items-center gap-2 mb-2">
        <FaRegCalendar className="w-4 h-4" />
        <span className="text-md">
          {dayjs(publishDate).format("MMMM D, YYYY | h:mm a")}
        </span>
      </div>

      <Tags tags={tags} className="my-4" />

      {image ? (
        <div
          className={`w-full h-[24rem] bg-no-repeat bg-cover mb-4`}
          style={{
            backgroundImage: `url(${image.url})`,
          }}
        />
      ) : null}

      <ComponentMap components={body} />
    </div>
  );
};

export default Post;
