import dayjs from "dayjs";
import { cache } from "react";
import orderBy from "lodash.orderby";
import readingTime from "reading-time";
import { notFound } from "next/navigation";
import { FaRegCalendar } from "react-icons/fa6";

import pkg from "~/package.json";
import { getPost } from "@/lib/cms";
import Tag from "@/components/ui/tag";
import { setMetadata } from "@/lib/utils";
import type { Post, Image } from "@/types";
import Markdown from "@/components/markdown";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageBackground from "@/components/image-background";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

const getData = cache(async (slug: string) => getPost(`/${slug}`));

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

export const generateMetadata = async ({
	params,
}: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const post = await getData(slug);

	if (!post) return null;

	const urlParams = new URLSearchParams();
	urlParams.set("title", post.metadata.title);
	urlParams.set("id", (post.image as Image).id);
	urlParams.set(
		"subtitle",
		`${pkg.details.author.name} | ${pkg.details.author.profession}`,
	);

	post.metadata.slug = `/blog/${slug}`;

	return setMetadata({
		...post.metadata,
		openGraph: {
			type: "article",
			title: post.metadata.title,
			description: post.metadata.description,
			url: post.metadata.slug,
			images: post.image
				? [
						{
							url: `/api/open-graph?${urlParams.toString()}`,
						},
					]
				: [],
		},
	});
};

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const post = await getData(slug);

	if (!post) {
		notFound();
	}

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
				<span>{dayjs(publish_date).format("MMMM D, YYYY | ")}</span>
				<span>{readingTime(body).text}</span>
			</div>

			{tags ? (
				<ul className="flex flex-wrap gap-x-4 gap-y-2 list-none">
					{orderBy(tags, "name").map(({ name, ...tag }) => (
						<li key={tag.id}>
							<Tag {...tag}>{name}</Tag>
						</li>
					))}
				</ul>
			) : null}

			{image ? (
				<AspectRatio ratio={16 / 9} className="overflow-hidden">
					<ImageBackground {...image} className="border-2 border-[--border]" />
				</AspectRatio>
			) : null}

			<Markdown>{body}</Markdown>
		</>
	);
};

export const dynamic = "force-dynamic";
export default PostPage;
