import { kebabToTitleCase } from "@/lib/utils";
import { getTagDefinition } from "@/lib/cms";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

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
	const title = kebabToTitleCase(tagName);

	// const tagDefinition = await getTagDefinition(tagName);

	// const posts = await getData(tagName);

	return (
		<>
			<Breadcrumbs
				breadcrumbs={BREADCRUMBS.concat({
					title,
					href: `/blog/tags/${tagName}`,
				})}
			/>

			<h1>Tag: {title}</h1>
		</>
	);
};

export default TagPage;
