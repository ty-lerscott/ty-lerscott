import type { Post } from "@/types";
import PostCard from "@/components/post-card";

const PostCardList = ({ posts }: { posts: Post[] }) => (
	<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{posts.map((post) => (
			<PostCard key={post?.id} {...post} />
		))}
	</div>
);

export default PostCardList;
