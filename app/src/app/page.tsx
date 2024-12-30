import { cache } from "react";
import ReactMarkdown from "react-markdown";

import { getPage } from "@/lib/cms";
import { setMetadata, SITE_URL } from "@/lib/utils";
import RecentPosts from "@/components/recent-posts";
import { Separator } from "@/components/ui/separator";

const getData = cache(async () => getPage("/", ["body"]));

export const generateMetadata = async () => {
	const page = await getData();
	const siteUrl = SITE_URL();

	return page
		? setMetadata({
				...page.metadata,
				openGraph: {
					title: page.metadata.title,
					description: page.metadata.description,
					url: `${siteUrl}${page.metadata.slug}`,
					images: [
						{
							url: `${siteUrl}/profile-card.png?slug=${page.metadata.slug}`,
						},
					],
				},
			})
		: null;
};

const RootPage = async () => {
	const page = await getData();

	if (!page) return null;

	return (
		<>
			<ReactMarkdown>{page.body}</ReactMarkdown>

			<Separator />

			<RecentPosts />
		</>
	);
};

export const dynamic = "force-dynamic";
export default RootPage;
