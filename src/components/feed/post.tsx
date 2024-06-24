import dayjs from "dayjs";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa6";
import type { Post as PostType } from "@/types/generics.types";

const Post = ({ slug, title, publishDate, description }: PostType) => {
  return (
    <div data-testid="Post" className="flex flex-col gap-1">
      <h2>
        <Link href={`/posts/${slug}`} className="py-1 pr-1">
          {title}
        </Link>
      </h2>
      <div className="flex items-center gap-2">
        <FaRegCalendar className="w-[0.75rem]" />
        <span className="italic text-sm">
          {dayjs(publishDate).format("MMMM D, YYYY | h:mm a")}
        </span>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default Post;
