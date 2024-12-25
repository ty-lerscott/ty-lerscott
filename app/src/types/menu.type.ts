import type { Page } from "@/types/page.type";

export type Menu = {
	id: string;
	icon: string | null;
	name: string | null;
	items: {
		item: Menu | Page;
	}[];
};
