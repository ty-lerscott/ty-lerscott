import Link from "next/link";
import { cache } from "react";

import { getTags } from "@/lib/cms";
import { cn, setMetadata } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";
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
				{tags.map(({ id, slug, name, color }) => (
					<li key={id}>
						<Link
							href={`/blog/tags/${slug}`}
							className={cn(badgeVariants(), color ? "text-[--white]" : "")}
							style={{
								...(color && {
									backgroundColor: color,
								}),
							}}
						>
							{name}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default TagsPage;
