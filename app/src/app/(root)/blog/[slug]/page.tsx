import dayjs from "dayjs";
import { cache } from "react";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";
import ReactMarkdown from "react-markdown";
import { FaRegCalendar } from "react-icons/fa6";

import pkg from "~/package.json";
import { getPost } from "@/lib/cms";
import Tag from "@/components/ui/tag";
import type { Post, Image } from "@/types";
import { setMetadata, SITE_URL } from "@/lib/utils";
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

export const generateMetadata = async ({
	params,
}: { params: { slug: string } }) => {
	const { slug } = await params;
	const post = await getData(slug);

	if (!post) return null;

	const urlParams = new URLSearchParams();
	urlParams.set("title", post.metadata.title);
	urlParams.set(
		"url",
		`${SITE_URL({ isCMS: true })}/assets/${(post.image as Image).id}?quality=50&transforms=${encodeURIComponent(JSON.stringify([["blur", 10]]))}`,
	);
	urlParams.set(
		"subtitle",
		`${pkg.details.author.name} | ${pkg.details.author.profession}`,
	);

	return setMetadata({
		...post.metadata,
		openGraph: {
			type: "article",
			title: post.metadata.title,
			description: post.metadata.description,
			url: `${SITE_URL()}/blog/${slug}`,
			images: post.image
				? [
						{
							url: `${SITE_URL()}/api/open-graph?${urlParams.toString()}`,
						},
					]
				: [],
		},
	});
};

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
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
				<span>{dayjs(publish_date).format("MMMM D, YYYY | ")}</span>
				<span>{readingTime(body).text}</span>
			</div>

			{tags ? (
				<ul className="flex flex-wrap gap-4 list-none">
					{tags.map(({ name, ...tag }) => (
						<li key={tag.id}>
							<Tag {...tag}>{name}</Tag>
						</li>
					))}
				</ul>
			) : null}

			{image ? (
				<AspectRatio ratio={16 / 9}>
					<ImageBackground {...image} />
				</AspectRatio>
			) : null}

			<ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
		</>
	);
};

export default PostPage;
