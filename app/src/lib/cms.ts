import {
	rest,
	readFile,
	readItems,
	readSingleton,
	createDirectus,
} from "@directus/sdk";

import { SITE_URL } from "@/lib/utils";

import type {
	Tag,
	Menu,
	Page,
	Link,
	Post,
	Image,
	ContactDetails,
} from "@/types";

type APIContactDetails = Omit<ContactDetails, "socials"> & {
	socials: {
		Link_id: Link;
	}[];
};

type GetSitemapData = {
	pages: Page[];
	posts: Post[];
	tags: Tag[];
};

const client = createDirectus(SITE_URL({ isCMS: true })).with(rest());

const PostFields = [
	"id",
	"body",
	"image",
	"status",
	"publish_date",
	"metadata.slug",
	"metadata.title",
	"metadata.description",
];

const getMenu = async (name: string): Promise<Menu | null> => {
	const fields = [
		...(name === "socials"
			? ["items.item.*"]
			: [
					"items.item.name",
					"items.item.metadata.slug",
					"items.item.metadata.title",
					"items.item.icon",
					"items.item.items.item.id",
					"items.item.items.item.metadata.slug",
					"items.item.items.item.metadata.title",
				]),
	];

	try {
		return client
			.request<Menu[]>(
				readItems("Menu", {
					filter: {
						name: {
							_eq: name,
						},
					},
					fields: ["items.item.id"].concat(fields),
				}),
			)
			.then((resp) => (resp.length ? resp[0] : null));
	} catch (err) {
		console.error(err);
	}

	return null;
};

const getPage = async <PageType = Page>(
	slug: string,
	fields?: string[],
): Promise<PageType> => {
	try {
		const resp = await client.request<PageType[]>(
			readItems("Pages", {
				filter: {
					metadata: {
						slug: {
							_eq: slug,
						},
					},
				},
				fields: ["metadata.*"].concat(fields || []),
			}),
		);

		return resp.length ? resp[0] : ({} as PageType);
	} catch (err) {
		console.error(err);
		return {} as PageType;
	}
};

const getPosts = async (
	args?:
		| {
				limit?: number;
				page?: number;
		  }
		| number,
): Promise<Post[]> => {
	const { limit = 10, page = 1 } =
		typeof args === "number" ? { limit: args } : args || {};

	try {
		const resp = await client.request<Post[]>(
			readItems("Post", {
				page,
				limit,
				sort: "-publish_date",
				fields: PostFields,
				filter: {
					status: {
						_eq: "published",
					},
				},
			}),
		);

		return resp.length ? resp : [];
	} catch (err) {
		console.error(err);

		return [];
	}
};

const getPostsByTagSlug = async (tagName: string): Promise<Post[] | null> => {
	try {
		const resp = await client.request<Post[]>(
			readItems("Post", {
				filter: {
					tags: {
						Tag_id: {
							slug: {
								_eq: tagName,
							},
						},
					},
					status: {
						_eq: "published",
					},
				},
				sort: "-publish_date",
				fields: PostFields,
			}),
		);

		return resp.length ? resp : null;
	} catch (err) {
		console.error(err);
	}
	return null;
};

const getPost = async (slug: string): Promise<Post | null> => {
	try {
		const resp = await client.request<Post[]>(
			readItems("Post", {
				filter: {
					metadata: {
						slug,
					},
				},
				fields: [
					"tags.Tag_id.*",
					"body",
					"image",
					"publish_date",
					{
						metadata: ["title", "description", "keywords", "slug"],
					},
				],
			}),
		);

		if (resp.length === 0) return null;

		const post = resp[0];

		post.tags = post.tags
			? post?.tags?.map((tag) => {
					const { Tag_id } = tag as unknown as { Tag_id: Tag };

					return Tag_id;
				})
			: null;

		const image = await client.request<Image>(
			readFile(post.image as string, {
				fields: ["id", "title", "description"],
			}),
		);

		post.image = image;

		return post;
	} catch (err) {
		console.error(err);
	}

	return null;
};

const getContactDetails = async (): Promise<ContactDetails | null> => {
	try {
		const resp = await client.request<APIContactDetails>(
			readSingleton("Contact", {
				fields: ["phone", "email", "socials.Link_id.*"],
			}),
		);

		return resp
			? {
					...resp,
					socials: resp.socials.map((item) => item.Link_id) as Link[],
				}
			: null;
	} catch (err) {
		console.error(err);
	}
	return null;
};

const getTags = async (): Promise<Tag[] | null> => {
	try {
		const resp = await client.request<Tag[]>(
			readItems("Tag", { fields: ["*"] }),
		);

		return resp.length ? resp : null;
	} catch (err) {
		console.error(err);
	}
	return null;
};

const getTag = async (slug: string): Promise<Tag | null> => {
	try {
		const resp = await client.request<Tag[]>(
			readItems("Tag", { filter: { slug } }),
		);

		return resp.length ? resp[0] : null;
	} catch (err) {
		console.error(err);
	}
	return null;
};

const getSitemap = async (): Promise<GetSitemapData> => {
	try {
		const [pages, posts, tags] = await Promise.all([
			client.request<Page[]>(
				readItems("Pages", {
					fields: ["metadata.slug", "date_updated"],
					filter: {
						status: {
							_eq: "published",
						},
					},
				}),
			),
			client.request<Post[]>(
				readItems("Post", {
					fields: ["metadata.slug", "date_updated", "image"],
					sort: "-date_updated",
					filter: {
						status: {
							_eq: "published",
						},
					},
				}),
			),
			client.request<Tag[]>(
				readItems("Tag", {
					fields: ["slug", "date_updated"],
					sort: "-date_updated",
				}),
			),
		]);

		return { pages, posts, tags };
	} catch (err) {
		console.error(err);

		return {
			pages: [],
			posts: [],
			tags: [],
		};
	}
};

export {
	getTag,
	getTags,
	getMenu,
	getPage,
	getPost,
	getPosts,
	getSitemap,
	type GetSitemapData,
	getPostsByTagSlug,
	getContactDetails,
};
