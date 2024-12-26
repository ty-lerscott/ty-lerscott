import type { Skill } from "./skill.type";
import type { Metadata } from "./metadata.type";
import type { Experience } from "./experience.type";

export type Page = {
	id: string;
	metadata: Metadata;
	body: string | null;
	icon: string | null;
	status: "draft" | "archived" | "published";
};

export type ResumePage = Omit<Page, "body"> & {
	resume_bio: string | null;
	education: string | null;
	experiences: Experience[] | null;
	skills: Skill[] | null;
	body: string[] | null;
};
