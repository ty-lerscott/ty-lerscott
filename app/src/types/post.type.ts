import type { Metadata } from "./metadata.type";

export type Post = {
	id: string;
	metadata: Metadata;
	publish_date: string;
};
