import { client, readItems } from "@/lib/directus";
import type { Menu, MenuItem, Page, Post } from "@/types";

const normalizeMenuItems = (menu: Menu): MenuItem[] =>
	menu.items.map(({ item }) => item);

const getMenu = async (name: string): Promise<MenuItem[] | null> => {
	try {
		const resp = await client.request(
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
				],
			}),
		);

		return normalizeMenuItems(resp[0] as Menu);
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
		const resp = await client.request(
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

		return resp[0] as Page;
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

const getPosts = async (
	args?: GetPostsArgs,
): Promise<Partial<Post>[] | null> => {
	const { limit = 10, page = 1 } =
		typeof args === "number" ? { limit: args } : args || {};

	try {
		const resp = await client.request(
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

		return resp as Partial<Post>[];
	} catch (err) {
		console.error(err);
	}
	return null;
};

export { getMenu, getPage, getPosts };
