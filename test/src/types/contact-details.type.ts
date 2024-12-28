import type { Link } from "./link.type";

export type ContactDetails = {
	name: string;
	email: string;
	phone: string;
	socials: Link[];
};
