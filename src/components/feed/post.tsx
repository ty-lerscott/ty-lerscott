import dayjs from "dayjs";
import Link from "@/components/component-map/link";
import { FaRegCalendar } from "react-icons/fa6";
import Header from "@/components/component-map/header";
import type { Post as PostType } from "@/types/generics.types";

import styles from "./styles.module.css";

const Post = ({ slug, title, publishDate, description }: PostType) => {
  return (
    <div data-testid="Post" className={styles.Post}>
      <Header
        tag="h4"
        className={styles.PostHeader}
        header={
          <Link href={`/posts/${slug}`} className="py-1 pr-1" text={title} />
        }
      />
      <div className={styles.PostDate}>
        <FaRegCalendar className="w-3 h-3" />
        <span className="text-xs">
          {dayjs(publishDate).format("MMMM D, YYYY | h:mm a")}
        </span>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default Post;
