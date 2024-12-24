export type Metadata = {
	id: number;
	title: string;
	description: string;
	keywords: string[];
	status: "draft" | "archived" | "published";
	slug: string;
};
