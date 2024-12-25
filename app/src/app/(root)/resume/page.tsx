import { cache } from "react";

import { getPage } from "@/lib/cms";
import type { ResumePageExtension, Page, Skill, Experience } from "@/types";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

const BREADCRUMBS = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "Resume",
		href: "/resume",
	},
] as Breadcrumb[];

type APIResumePage = {
	experiences: {
		Work_Experience_id: Experience;
	}[];
	skills: {
		Resume_Skill_id: Skill;
	}[];
};

const getResume = cache(async () =>
	getPage<APIResumePage>("/resume", [
		"resume_bio",
		"education",
		"body",
		"experiences.Work_Experience_id.*",
		"skills.Resume_Skill_id.*",
	]).then((pageData) => {
		if (!pageData) return null;

		const resumePage = {
			...pageData,
			skills: pageData.skills?.map((skill) => skill.Resume_Skill_id),
			experiences: pageData.experiences?.map(
				(experience) => experience.Work_Experience_id,
			),
		} as Page<ResumePageExtension>;

		return resumePage;
	}),
);

const ResumePage = async () => {
	const resume = await getResume();

	if (!resume) return null;

	console.dir(resume, { depth: null });

	return (
		<>
			<Breadcrumbs breadcrumbs={BREADCRUMBS} />
		</>
	);
};

export default ResumePage;
