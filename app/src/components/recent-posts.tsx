import dayjs from "dayjs";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa6";

import { getPosts } from "@/lib/cms";
import type { Post as PostType } from "@/types";

const Post = ({ metadata, publish_date }: Partial<PostType>) => {
	const blurb = metadata?.description?.substring(0, 256);
	const isLong = metadata && metadata?.description?.length > 256;

	return (
		<div data-testid="Post" className="flex flex-col">
			<h4>
				<Link
					href={`/posts/${metadata?.slug}`}
					className="py-1 pr-1 inline-block w-auto text-[inherit]"
				>
					{metadata?.title}
				</Link>
			</h4>

			<div className="text-[--ghost] flex items-center gap-2 text-sm mt-2">
				<FaRegCalendar className="size-2.5" />
				<span>{dayjs(publish_date).format("MMMM D, YYYY | h:mm a")}</span>
			</div>

			<p className="text-sm mt-2 text-[--ghost]">
				{blurb}
				{isLong ? "..." : ""}
			</p>
		</div>
	);
};

const RecentPosts = async () => {
	const posts = await getPosts();

	if (!posts) return null;

	return (
		<section data-testid="RecentPosts">
			<div className="flex flex-col gap-4">
				<h2>Recent Posts</h2>

				<ul className="list-none">
					{posts.map((post) => {
						return <Post key={post?.id} {...post} />;
					})}
				</ul>
			</div>
		</section>
	);
};

export default RecentPosts;
