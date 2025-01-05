import { cache } from "react";
import orderBy from "lodash.orderby";
import { getTags } from "@/lib/cms";
import Tag from "@/components/ui/tag";
import { setMetadata, SITE_URL } from "@/lib/utils";
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
	const siteUrl = SITE_URL();

	return tags
		? setMetadata({
				title: "Blog Tags",
				slug: "/blog/tags",
				keywords: tags.map(({ name }) => name).join(", "),
				openGraph: {
					title: "Blog Tags",
					url: `${siteUrl}/blog/tags`,
					images: [
						{
							url: `${siteUrl}/profile-card.png?slug=/blog/tags`,
						},
					],
				},
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

			<ul className="flex flex-wrap gap-x-4 gap-y-2 list-none">
				{orderBy(tags, "name").map(({ name, ...tag }) => (
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
