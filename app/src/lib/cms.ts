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

		if (resp.length === 0) throw new Error("Page not found");

		return resp[0];
	} catch (err) {
		console.error(err);
		return {} as PageType;
	}
};

const getPosts = async (fields?: string[]): Promise<Post[]> => {
	try {
		const resp = await client.request<Post[]>(
			readItems("Post", {
				// page,
				// limit
				sort: "-publish_date",
				fields: PostFields.concat(fields || []),
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
					status: {
						_eq: "published",
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

const getContactDetails = async (
	extended?: boolean,
): Promise<ContactDetails> => {
	try {
		const resp = await client.request<APIContactDetails>(
			readSingleton("Contact", {
				fields: ["phone", "email", "socials.Link_id.*"].concat(
					extended
						? [
								"image",
								"current_role.title",
								"current_role.company",
								"current_role.location",
							]
						: [],
				),
			}),
		);

		return {
			...(resp && {
				...resp,
				socials: resp.socials.map((item) => item.Link_id) as Link[],
			}),
		};
	} catch (err) {
		console.error(err);
		return {} as ContactDetails;
	}
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

const getRssFeed = async (): Promise<[Page, Post[]]> => {
	try {
		return Promise.all([
			getPage("/blog"),
			client.request<Post[]>(
				readItems("Post", {
					// page,
					// limit
					sort: "-publish_date",
					fields: [
						"image",
						"publish_date",
						"metadata.slug",
						"metadata.title",
						"tags.Tag_id.name",
						"metadata.keywords",
						"metadata.description",
					],
					filter: {
						status: {
							_eq: "published",
						},
					},
				}),
			),
		]).then(([page, posts]) => [
			page,
			posts.map((post) => {
				const _postTags = post.tags as unknown as { Tag_id: Tag }[];

				const newPost = post;
				newPost.tags = _postTags.map((tag) => tag.Tag_id) as Tag[];

				return newPost;
			}),
		]);
	} catch (err) {
		console.error(err);
		return [{} as Page, []];
	}
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
	getRssFeed,
	type GetSitemapData,
	getPostsByTagSlug,
	getContactDetails,
};
