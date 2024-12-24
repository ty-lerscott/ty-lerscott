import type { Page } from "@/types/page.type";

export type MenuItem = {
	id: string;
	href: string | null;
	text: string | null;
	external: boolean;
	brand: string | null;
	page: Page | null;
	icon: string | null;
};

export type Menu = {
	id: string;
	icon: string | null;
	name: string | null;
	items: {
		item: Menu | MenuItem;
	}[];
};
