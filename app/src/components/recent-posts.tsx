import { getPosts } from "@/lib/cms";
import PostCard from "@/components/post-card";

const RecentPosts = async () => {
	const posts = await getPosts();

	if (!posts) return null;

	return (
		<section data-testid="RecentPosts">
			<div className="flex flex-col gap-4">
				<h2>Recent Posts</h2>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => {
						return <PostCard key={post?.id} {...post} />;
					})}
				</div>
			</div>
		</section>
	);
};

export default RecentPosts;
