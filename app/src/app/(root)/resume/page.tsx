import { cache, type PropsWithChildren } from "react";

import { yearsAgo } from "@/lib/utils";
import { ResumeHeader } from "./client";
import SocialMap from "@/components/social-map";
import { getPage, getContactDetails } from "@/lib/cms";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";
import type { ResumePageExtension, Page, Skill, Experience } from "@/types";

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
		return pageData
			? ({
					...pageData,
					skills: pageData.skills?.map(
						({ Resume_Skill_id }) => Resume_Skill_id,
					),
					body: pageData.body?.split(/\n/g).reduce((acc, item) => {
						const next = item.replace(/^\-\s?/, "").trim();

						if (next) {
							acc.push(next);
						}

						return acc;
					}, [] as string[]),
					experiences: pageData.experiences?.map(
						({ Work_Experience_id }) => Work_Experience_id,
					),
				} as Page<ResumePageExtension>)
			: null;
	}),
);

const SectionHeader = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex flex-col">
			<h3 className="p-4 border-y-2 border-[--ghost] text-center uppercase tracking-widest">
				{children}
			</h3>
		</div>
	);
};

const ResumeBio = ({ bio }: { bio: string }) => {
	const matches = bio.match(/{{(.*?)}}/);
	const professionalExperience = Array.isArray(matches)
		? yearsAgo(matches[1].split(":")[1])
		: 0;

	return (
		<div>
			<SectionHeader>About Me</SectionHeader>
			<p className="p-4 tracking-widest text-center leading-4 text-xs">
				{bio.replace(/{{(.*?)}}/, String(professionalExperience))}
			</p>
		</div>
	);
};

const ContactDetails = async () => {
	const contactDetails = await getContactDetails();

	if (!contactDetails) return null;

	const { email, phone, socials } = contactDetails;

	return (
		<div>
			<SectionHeader>Contact</SectionHeader>

			<div className="flex flex-col gap-2 text-center my-4">
				<p>{email}</p>
				<p>{phone}</p>
				{(socials || []).map(({ id, brand, text }) => {
					const Icon = SocialMap[brand as keyof typeof SocialMap];

					return (
						<div key={id} className="flex gap-2 items-center justify-center">
							<Icon />
							<p>{text}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const ResumePage = async () => {
	const resume = await getResume();

	if (!resume) return null;

	const { body, skills, experiences, resume_bio } = resume;

	return (
		<>
			<Breadcrumbs breadcrumbs={BREADCRUMBS} />

			<div className="border-[--ghost] border-2 rounded">
				<ResumeHeader roles={body} />

				<div data-testid="ResumeBody" className="grid grid-cols-8">
					<div data-testid="Sidebar" className="col-span-3">
						{resume_bio ? <ResumeBio bio={resume_bio} /> : null}

						<ContactDetails />

						{/* {resumeSkills.length ? <Skills skills={resumeSkills} /> : null} */}
					</div>

					{/* <div data-testid="Experiences" className={styles.Experiences}> */}
					{/* {workExperience.length ? (
						<Experiences experiences={workExperience} />
						) : null}

						{education.length ? <Education education={education} /> : null} */}
					{/* </div> */}
				</div>
			</div>
		</>
	);
};

export default ResumePage;
