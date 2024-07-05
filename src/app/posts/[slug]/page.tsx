import dayjs from "dayjs";
import { cache } from "react";
import pkg from "~/package.json";
import dynamic from "next/dynamic";
import { getPost } from "@/lib/contentful";
import { Fira_Code } from "next/font/google";
import { cn, setMetadata } from "@/lib/utils";
import { FaRegCalendar } from "react-icons/fa6";
import { querify } from "@/lib/contentful/helpers";
import ComponentMap from "@/components/component-map";
import Header from "@/components/component-map/header";
import ImageBackground from "@/components/image/background";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";
import { PageParams, Header as HeaderType } from "@/types/generics.types";

const Tags = dynamic(() => import("@/components/tags"));

import styles from "./styles.module.css";

const fira = Fira_Code({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const getData = cache(async (slug: string) => getPost(slug));

const BREADCRUMBS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Posts",
    href: "/posts",
  },
] as Breadcrumb[];

export const generateMetadata = async ({
  params: { slug: pageSlug },
}: PageParams) => {
  const { title, description, keywords, image, ...rest } =
    await getData(pageSlug);

  return setMetadata({
    alternates: {
      canonical: `/posts/${pageSlug}`,
    },
    title: `${title} | Blog ${pkg.metadata.title}`,
    keywords,
    description,
    openGraph: {
      title: `${title} ${pkg.metadata.title}`,
      description,
      url: `/posts/${pageSlug}`,
      images: image && [
        {
          width: image.details.image.width,
          height: image.details.image.height,
          url: `/api/blur?${querify({
            title,
            w: image.details.image.width,
            h: image.details.image.height,
            url: image.url.replace(/^\/+/, ""),
          })}`,
        },
      ],
    },
  });
};

const Post = async ({ params: { slug } }: PageParams) => {
  const { title, publishDate, image, tags, body } = await getData(slug);

  return (
    <div data-testid="Page-Post" className={cn(styles.PostPage, fira.variable)}>
      <Breadcrumbs breadcrumbs={BREADCRUMBS.concat({ title, href: slug })} />

      <Header
        header={title}
        tag={"h1" as HeaderType["tag"]}
        subheader={
          <div className={styles.Subheader}>
            <FaRegCalendar className="size-4" />
            <span>{dayjs(publishDate).format("MMMM D, YYYY | h:mm a")}</span>
          </div>
        }
      />

      {tags.length ? <Tags tags={tags} /> : null}

      {image ? (
        <div className={styles.Image}>
          <ImageBackground
            url={`${image.url}`}
            width={image.details.image.width}
            height={image.details.image.height}
          />
        </div>
      ) : null}

      <ComponentMap components={body} />
    </div>
  );
};

export default Post;
