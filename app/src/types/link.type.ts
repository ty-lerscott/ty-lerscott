import type { Page } from "./page.type";

export type Link = {
	id: string;
	external: boolean;
	page: Page | null;
	href: string | null;
	brand: string | null;
	text: string | null;
	icon: string | null;
};
