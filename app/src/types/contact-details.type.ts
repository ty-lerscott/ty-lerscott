import type { Link } from "./link.type";
import type { Experience } from "./experience.type";

export type ContactDetails = {
	name: string;
	email: string;
	phone: string;
	image: string;
	socials: Link[];
	current_role: Experience;
};
