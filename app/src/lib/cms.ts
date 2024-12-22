import { client, readItems } from "@/lib/directus";
import type { Menu, MenuItem } from "@/types/menu.type";
import type { Page } from "@/types/page.type";

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

export { getMenu, getPage };
