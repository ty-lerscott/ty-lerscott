export type Metadata = {
	slug: string;
	title: string;
};

export type Page = {
	metadata: Metadata;
	body: string | null;
};
