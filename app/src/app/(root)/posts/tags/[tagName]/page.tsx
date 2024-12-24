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
	const title = kebabToTitleCase(tagName);

	// const posts = await getData(tagName);

	return (
		<>
			<Breadcrumbs
				breadcrumbs={BREADCRUMBS.concat({
					title,
					href: `/posts/tags/${tagName}`,
				})}
			/>

			<h1>Tag: {title}</h1>
		</>
	);
};

export default TagPage;
