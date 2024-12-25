import type { Metadata } from "./metadata.type";

export type Page = {
	id: string;
	metadata: Metadata;
	body: string | null;
	icon: string | null;
	status: "draft" | "archived" | "published";
};
