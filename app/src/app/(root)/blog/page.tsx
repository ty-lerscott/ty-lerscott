import { setMetadata } from "@/lib/utils";
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

export const generateMetadata = () =>
	setMetadata({
		title: "Blog",
		slug: "/blog",
	});

const PostsPage = () => {
	return (
		<>
			<Breadcrumbs breadcrumbs={BREADCRUMBS} />

			<RecentPosts />
		</>
	);
};

export default PostsPage;
