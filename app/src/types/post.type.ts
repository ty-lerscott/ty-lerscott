import type { Tag } from "./tag.type";
import type { Image } from "./image.type";
import type { Metadata } from "./metadata.type";

export type Post = {
	id: string;
	date_created: string;
	date_updated: string;
	publish_date: string;
	image: Image | string | null;
	tags: Tag[] | null;
	body: string;
	metadata: Metadata;
};
