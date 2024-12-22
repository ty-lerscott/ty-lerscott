import { client, readItems } from "@/lib/directus";
import type { Menu, MenuItem } from "@/types/menu.type";

const normalizeMenuItems = (menu: Menu): MenuItem[] =>
	menu.items.map(({ item }) => item);

export const getMenu = async (name: string): Promise<MenuItem[] | null> => {
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
