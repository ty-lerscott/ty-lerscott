import { cache } from "react";

import { setMetadata } from "@/lib/utils";
import PostCard from "@/components/post-card";
import { getTag, getPostsByTagSlug } from "@/lib/cms";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

const getTagData = cache(async (tagName: string) => getTag(tagName));
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

export const generateMetadata = async ({
	params,
}: { params: { tagName: string } }) => {
	const { tagName } = await params;
	const tag = await getTagData(tagName);

	return tag
		? setMetadata({
				title: `Tag: ${tag.name}`,
				slug: `/blog/tags/${tag.slug}`,
			})
		: null;
};

const TagPage = async ({ params }: { params: { tagName: string } }) => {
	const { tagName } = await params;
	const [posts, tag] = await Promise.all([
		getData(tagName),
		getTagData(tagName),
	]);

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
