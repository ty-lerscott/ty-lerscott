import { setMetadata, SITE_URL } from "@/lib/utils";
import RecentPosts from "@/components/recent-posts";
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
] as Breadcrumb[];

export const generateMetadata = () => {
	const siteUrl = SITE_URL();

	return setMetadata({
		title: "Blog",
		slug: "/blog",
		openGraph: {
			url: siteUrl,
			images: [
				{
					url: `${siteUrl}/profile-card.png?slug=/blog`,
				},
			],
		},
	});
};

const PostsPage = () => {
	return (
		<>
			<Breadcrumbs breadcrumbs={BREADCRUMBS} />

			<RecentPosts />
		</>
	);
};

export const dynamic = "force-dynamic";
export default PostsPage;
