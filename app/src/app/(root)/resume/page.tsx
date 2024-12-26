import Link from "next/link";
import { cache } from "react";

import { yearsAgo } from "@/lib/utils";
import SocialMap from "@/components/social-map";
import { getPage, getContactDetails } from "@/lib/cms";
import { ResumeHeader, Skills } from "./components/client";
import { SectionHeader } from "./components/section-header";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";
import type { ResumePage as ResumePageType, Skill, Experience } from "@/types";

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

type APIResumePage = Omit<ResumePageType, "experiences" | "skills" | "body"> & {
	experiences: {
		Work_Experience_id: Experience;
	}[];
	skills: {
		Resume_Skill_id: Skill;
	}[];
	body: string;
};

const getResume = cache(async () =>
	getPage<APIResumePage>("/resume", [
		"resume_bio",
		"education",
		"body",
		"experiences.Work_Experience_id.*",
		"skills.Resume_Skill_id.*",
	]).then((pageData) => {
		const _pageData = pageData as APIResumePage;
		return _pageData
			? ({
					...pageData,
					skills: _pageData.skills?.map(
						({ Resume_Skill_id }) => Resume_Skill_id,
					),
					body: _pageData.body?.split(/\n/g).reduce((acc, item) => {
						const next = item.replace(/^\-\s?/, "").trim();

						if (next) {
							acc.push(next);
						}

						return acc;
					}, [] as string[]),
					experiences: _pageData.experiences?.map(
						({ Work_Experience_id }) => Work_Experience_id,
					),
				} as ResumePageType)
			: null;
	}),
);

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
		<>
			<SectionHeader>Contact</SectionHeader>

			<div className="flex flex-col gap-2 text-center my-4">
				<p>{email}</p>
				<p>{phone}</p>
				{(socials || []).map(({ id, brand, text, href }) => {
					const Icon = SocialMap[brand as keyof typeof SocialMap];

					return (
						<Link
							key={id}
							target="_blank"
							href={href as string}
							className="flex gap-2 items-center justify-center"
						>
							<Icon />
							<p>{text}</p>
						</Link>
					);
				})}
			</div>
		</>
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
				<ResumeHeader roles={body as string[]} />

				<div data-testid="ResumeBody" className="grid grid-cols-9">
					<div data-testid="Sidebar" className="col-span-3">
						{resume_bio ? <ResumeBio bio={resume_bio} /> : null}

						<ContactDetails />

						{skills?.length ? <Skills skills={skills} /> : null}
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
