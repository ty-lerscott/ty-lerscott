import { client, readItems, readFile, readItem } from "@/lib/directus";
import type { Menu, MenuItem, Page, Post, Image } from "@/types";

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
						"items.item.*",
						"items.item.page.metadata.slug",
						"items.item.page.metadata.title",
						"items.item.items.item.*",
						"items.item.items.item.page.metadata.title",
						"items.item.items.item.page.metadata.slug",
					],
				}),
			)
			.then(([resp]) => resp ?? null);
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
			readItems("Posts", {
				page,
				limit,
				sort: "-publish_date",
				fields: [
					"id",
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
			readItems("Posts", {
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

export { getMenu, getPage, getPosts, getPost };
