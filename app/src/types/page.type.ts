import type { Metadata } from "./metadata.type";

export type Page = {
	metadata: Metadata;
	body: string | null;
};
