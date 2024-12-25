import { cache } from "react";

import PostCard from "@/components/post-card";
import { getTag, getPostsByTagSlug } from "@/lib/cms";
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
	const [posts, tag] = await Promise.all([getData(tagName), getTag(tagName)]);

	if (!tag) return null;

	const { name } = tag;

	return (
		<>
			<Breadcrumbs
				breadcrumbs={BREADCRUMBS.concat({
					title: name,
					href: `/blog/tags/${tagName}`,
				})}
			/>

			<h1>Tag: {name}</h1>

			{posts?.length ? (
				<div className="grid gap-4 grid-cols-3">
					{posts.map((post) => {
						return <PostCard key={post.id} {...post} />;
					})}
				</div>
			) : null}
		</>
	);
};

export default TagPage;
