import { client, readItems, readFile, readSingleton } from "@/lib/directus";

import type { Menu, Page, Post, Image, Tag } from "@/types";

const getMenu = async (name: string): Promise<Menu | null> => {
	try {
		return client
			.request<Menu[]>(
				readItems("Menu", {
					filter: {
						name: {
							_eq: name,
						},
					},
					fields: [
						"items.item.name",
						"items.item.id",
						"items.item.metadata.slug",
						"items.item.metadata.title",
						"items.item.icon",
						"items.item.items.item.id",
						"items.item.items.item.metadata.slug",
						"items.item.items.item.metadata.title",
					],
				}),
			)
			.then((resp) => (resp.length ? resp[0] : null));
	} catch (err) {
		console.error(err);
	}

	return null;
};

const getPage = async (
	slug: string,
	fields?: string[],
): Promise<Page | null> => {
	try {
		const resp = await client.request<Page[]>(
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

		return resp.length ? resp[0] : null;
	} catch (err) {
		console.error(err);
	}
	return null;
};

type GetPostsArgs =
	| {
			limit?: number;
			page?: number;
	  }
	| number;

const getPosts = async (args?: GetPostsArgs): Promise<Post[] | null> => {
	const { limit = 10, page = 1 } =
		typeof args === "number" ? { limit: args } : args || {};

	try {
		const resp = await client.request<Post[]>(
			readItems("Post", {
				page,
				limit,
				sort: "-publish_date",
				fields: [
					"id",
					"body",
					"image",
					"publish_date",
					"metadata.slug",
					"metadata.title",
					"metadata.description",
				],
			}),
		);

		return resp;
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
					"tags",
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

const getTagDefinition = async (tagName: string): Promise<Tag | null> => {
	try {
		const resp = await client.request<Tag[]>(
			readSingleton("Tag_Dictionary", {
				// filter: {
				// 	Tag: {
				// 		_eq: tagName,
				// 	},
				// },
				fields: ["*"],
			}),
		);

		console.log(resp);

		return resp.length ? resp[0] : null;
	} catch (err) {
		console.error(err);
	}

	return null;
};

export { getMenu, getPage, getPosts, getPost, getTagDefinition };
