import { kebabToTitleCase } from "@/lib/utils";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

const BREADCRUMBS = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Posts",
		href: "/posts",
	},
	{
		title: "Tags",
		href: "/posts/tags",
	},
] as Breadcrumb[];

const TagPage = async ({ params }: { params: { tagName: string } }) => {
	const { tagName } = await params;

	// const posts = await getData(tagName);

	return (
		<div>
			<Breadcrumbs
				breadcrumbs={BREADCRUMBS.concat({
					title: kebabToTitleCase(tagName),
					href: `/posts/tags/${tagName}`,
				})}
			/>
		</div>
	);
};

export default TagPage;
