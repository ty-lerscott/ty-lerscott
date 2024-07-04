import dayjs from "dayjs";
import { getPosts } from "@/lib/contentful";
import type { PropsWithChildren } from "react";
import { FaRegCalendar } from "react-icons/fa6";
import Link from "@/components/component-map/link";
import Header from "@/components/component-map/header";
import type { Post as PostType } from "@/types/generics.types";

import styles from "./styles.module.css";

const Post = ({ slug, title, publishDate, description }: PostType) => {
  return (
    <div data-testid="Post" className={styles.Post}>
      <Header
        tag="h4"
        header={
          <Link href={`/posts/${slug}`} className={styles.Link} text={title} />
        }
      />

      <div className={styles.Date}>
        <FaRegCalendar className={styles.Calendar} />
        <span>{dayjs(publishDate).format("MMMM D, YYYY | h:mm a")}</span>
      </div>
      <p className={styles.Description}>{description}</p>
    </div>
  );
};

const RecentPosts = async ({
  className,
  children,
}: PropsWithChildren & { className?: string }) => {
  const { posts } = await getPosts();

  if (!posts?.length) return null;

  return (
    <section data-testid="RecentPosts">
      <div className={styles.Posts}>
        <Header header="Recent Posts" tag="h2" className={styles.Header} />
        {posts.map((post, index) => {
          return <Post key={index} {...post} />;
        })}
      </div>
      {children}
    </section>
  );
};

export default RecentPosts;
