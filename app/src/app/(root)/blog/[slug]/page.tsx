import dayjs from "dayjs";
import Link from "next/link";
import { cache } from "react";
import readingTime from "reading-time";
import ReactMarkdown from "react-markdown";
import { FaRegCalendar } from "react-icons/fa6";

import { getPost } from "@/lib/cms";
import type { Post, Image } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageBackground from "@/components/image-background";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

const getData = cache(async (slug: string) => getPost(`/blog/${slug}`));

const BREADCRUMBS = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Blog",
		href: "/blog",
	},
] as Breadcrumb[];

const PostPage = async ({ params }: { params: { slug: string } }) => {
	const { slug } = await params;
	const post = await getData(slug);

	if (!post) return null;

	const {
		tags,
		body,
		image,
		publish_date,
		metadata: { title },
	} = post as Omit<Post, "image"> & { image: Image };

	return (
		<>
			<Breadcrumbs breadcrumbs={BREADCRUMBS.concat({ title, href: slug })} />

			<h1>{title}</h1>

			<div className="flex items-center gap-2 text-[--ghost]">
				<FaRegCalendar className="size-4" />
				<span>{dayjs(publish_date).format("MMMM D, YYYY | h:mm a | ")}</span>
				<span>{readingTime(body).text}</span>
			</div>

			{image ? (
				<AspectRatio ratio={16 / 9}>
					<ImageBackground {...image} />
				</AspectRatio>
			) : null}

			<ReactMarkdown>{body}</ReactMarkdown>

			{tags ? (
				<div className="flex flex-col gap-2">
					<h3>Tags</h3>

					<ul className="flex flex-wrap gap-4 list-none">
						{tags.map((tag) => (
							<li key={tag}>
								<Link href={`/blog/tags/${tag}`} className="underline">
									{tag}
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</>
	);
};

export default PostPage;
