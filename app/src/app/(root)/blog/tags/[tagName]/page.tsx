import { cache } from "react";

import PostCard from "@/components/post-card";
import { getPostsByTagSlug } from "@/lib/cms";
import { kebabToTitleCase } from "@/lib/utils";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

const getData = cache(async (tagName: string) => getPostsByTagSlug(tagName));

const BREADCRUMBS = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Blog",
		href: "/blog",
	},
	{
		title: "Tags",
		href: "/blog/tags",
	},
] as Breadcrumb[];

const TagPage = async ({ params }: { params: { tagName: string } }) => {
	const { tagName } = await params;
	const posts = await getData(tagName);
	const title = kebabToTitleCase(tagName);

	if (!posts) return null;

	return (
		<>
			<Breadcrumbs
				breadcrumbs={BREADCRUMBS.concat({
					title,
					href: `/blog/tags/${tagName}`,
				})}
			/>

			<h1>Tag: {title}</h1>

			<div className="grid gap-4 grid-cols-3">
				{posts.map((post) => {
					return <PostCard key={post.id} {...post} />;
				})}
			</div>
		</>
	);
};

export default TagPage;
