import { getPosts } from "@/lib/cms";
import PostCardList from "@/components/post-card-list";

const RecentPosts = async () => {
	const posts = await getPosts();

	if (!posts) return null;

	return (
		<section data-testid="RecentPosts">
			<div className="flex flex-col gap-4">
				<h2>Recent Posts</h2>

				<PostCardList posts={posts} />
			</div>
		</section>
	);
};

export default RecentPosts;
