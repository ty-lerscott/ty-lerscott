import dayjs from "dayjs";
import { cache } from "react";
import Image from "next/image";
import Tags from "@/components/tags";
import { cn, setMetadata } from "@/lib/utils";
import { getPost } from "@/lib/contentful";
import { Fira_Code } from "next/font/google";
import { FaRegCalendar } from "react-icons/fa6";
import { PageParams } from "@/types/generics.types";
import ComponentMap from "@/components/component-map";
import Header from "@/components/component-map/header";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

import styles from "./styles.module.css";

const fira = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
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
    <div data-testid="Page-Post" className={cn(styles.PostPage, fira.variable)}>
      <Breadcrumbs breadcrumbs={BREADCRUMBS.concat({ title, href: slug })} />

      <Header
        tag="h1"
        header={title}
        subheader={
          <div className={styles.Subheader}>
            <FaRegCalendar className="size-4" />
            <span>{dayjs(publishDate).format("MMMM D, YYYY | h:mm a")}</span>
          </div>
        }
      />

      <Tags tags={tags} />

      {image ? (
        <div
          className={styles.PostImage}
          style={{
            backgroundImage: `url(${image.url})`,
          }}
        />
      ) : null}

      {/*<ComponentMap components={body} />*/}
    </div>
  );
};

export default Post;
