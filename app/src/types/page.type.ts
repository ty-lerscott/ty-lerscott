import type { Skill } from "./skill.type";
import type { Metadata } from "./metadata.type";
import type { Experience } from "./experience.type";

export type Page<Extensions = Record<string, unknown>> = Extensions & {
	id: string;
	metadata: Metadata;
	body: string | null;
	icon: string | null;
	status: "draft" | "archived" | "published";
};

export type ResumePageExtension = {
	resume_bio: string | null;
	education: string | null;
	experiences: Experience[] | null;
	skills: Skill[] | null;
};
