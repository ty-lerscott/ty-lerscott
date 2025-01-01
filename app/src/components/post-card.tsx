import dayjs from "dayjs";
import Link from "next/link";
import readingTime from "reading-time";
import { FaRegCalendar } from "react-icons/fa6";

import type { Post as PostType } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageBackground from "@/components/image-background";

const PostCard = ({
	metadata,
	body,
	publish_date,
	image,
}: Partial<PostType>) => {
	const blurb = metadata?.description?.substring(0, 256);
	const isLong = metadata && metadata?.description?.length > 256;

	const slug = metadata?.slug ? `/blog${metadata?.slug}` : "";

	return (
		<div className="rounded-xl border border-[--border] w-full p-4 flex flex-col gap-4 justify-between">
			<Link href={slug} tabIndex={-1}>
				<AspectRatio ratio={16 / 9} className="rounded overflow-hidden group">
					<ImageBackground
						id={image as string}
						className="group-hover:scale-110 transition-all duration-200"
					/>
				</AspectRatio>
			</Link>

			<div>
				<Link
					href={slug}
					className="font-semibold leading-tight text-[--heading]"
				>
					{metadata?.title}
				</Link>
			</div>

			<p className="text-sm leading-tight">{`${blurb}${isLong ? "..." : ""}`}</p>

			<div className="flex items-center justify-between gap-2 text-xs text-[--ghost]">
				<div className="flex items-center gap-2">
					<FaRegCalendar className="size-2.5" />
					<span>{dayjs(publish_date).format("MMMM D, YYYY")}</span>
				</div>

				<span>{readingTime(body as string).text}</span>
			</div>
		</div>
	);
};

export default PostCard;
