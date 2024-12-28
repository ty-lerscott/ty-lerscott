import dayjs from "dayjs";
import Link from "next/link";
import readingTime from "reading-time";
import { FaRegCalendar } from "react-icons/fa6";

import type { Post as PostType } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageBackground from "@/components/image-background";

import {
	Card,
	CardTitle,
	CardHeader,
	CardFooter,
	CardDescription,
} from "@/components/ui/card";

const PostCard = ({
	metadata,
	body,
	publish_date,
	image,
}: Partial<PostType>) => {
	const blurb = metadata?.description?.substring(0, 256);
	const isLong = metadata && metadata?.description?.length > 256;

	return (
		<Card className="w-full">
			<CardHeader>
				<Link href={metadata?.slug || ""} tabIndex={-1}>
					<AspectRatio ratio={16 / 9} className="overflow-hidden group">
						<ImageBackground
							id={image as string}
							className="group-hover:scale-110 transition-all duration-200"
						/>
					</AspectRatio>
				</Link>

				<CardTitle className="text-[--heading]">
					<Link href={metadata?.slug || ""}>{metadata?.title}</Link>
				</CardTitle>
				<CardDescription>
					{blurb}
					{isLong ? "..." : ""}
				</CardDescription>
			</CardHeader>
			<CardFooter className="flex items-center justify-between gap-2 text-xs text-[--ghost]">
				<div className="flex items-center gap-2">
					<FaRegCalendar className="size-2.5" />
					<span>{dayjs(publish_date).format("MMMM D, YYYY")}</span>
				</div>

				<span>{readingTime(body as string).text}</span>
			</CardFooter>
		</Card>
	);
};

export default PostCard;
