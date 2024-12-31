import type { Link } from "./link.type";
import type { Page } from "./page.type";

export type Menu = {
	id: string;
	icon: string | null;
	name: string | null;
	items: {
		item: Menu | Page | Link;
	}[];
};
