import { cache } from "react";

import { getTags } from "@/lib/cms";
import Tag from "@/components/ui/tag";
import { setMetadata } from "@/lib/utils";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

const getData = cache(async () => getTags());

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

export const generateMetadata = async () => {
	const tags = await getData();

	return tags
		? setMetadata({
				title: "Blog Tags",
				slug: "/blog/tags",
				keywords: tags.map(({ name }) => name).join(", "),
			})
		: null;
};

const TagsPage = async () => {
	const tags = await getData();

	if (!tags) return null;

	return (
		<>
			<Breadcrumbs breadcrumbs={BREADCRUMBS} />

			<h1>Tags</h1>

			<ul className="flex flex-wrap gap-4 list-none">
				{tags.map(({ name, ...tag }) => (
					<li key={tag.id}>
						<Tag {...tag}>{name}</Tag>
					</li>
				))}
			</ul>
		</>
	);
};

export const dynamic = "force-dynamic";
export default TagsPage;
