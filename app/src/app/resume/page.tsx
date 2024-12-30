import Link from "next/link";
import { cache } from "react";
import { TfiEmail } from "react-icons/tfi";
import { SlScreenSmartphone } from "react-icons/sl";

import Education from "./components/education";
import SocialMap from "@/components/social-map";
import Experiences from "./components/experiences";
import { yearsAgo, setMetadata } from "@/lib/utils";
import { getPage, getContactDetails } from "@/lib/cms";
import SectionHeader from "./components/section-header";
import { ResumeHeader, Skills } from "./components/client";
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
	education: string;
};

const normalizePageData = (pageData: APIResumePage) => {
	const _pageData = pageData as APIResumePage;
	return _pageData
		? ({
				...pageData,
				skills: _pageData.skills?.map(({ Resume_Skill_id }) => Resume_Skill_id),
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
				education: _pageData.education?.split("---").reduce((acc, item) => {
					const next = item.split("\n").filter(Boolean);
					acc.push(next);

					return acc;
				}, [] as string[][]),
			} as ResumePageType)
		: null;
};

const getResume = cache(async () =>
	getPage<APIResumePage>("/resume", [
		"resume_bio",
		"education",
		"body",
		"experiences.Work_Experience_id.*",
		"skills.Resume_Skill_id.*",
	]).then((data) => normalizePageData(data as APIResumePage)),
);

export const generateMetadata = async () => {
	const page = await getResume();

	return page ? setMetadata(page.metadata) : null;
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
		<>
			<SectionHeader>Contact</SectionHeader>

			<div className="flex flex-col gap-2 my-4 text-xs items-center">
				<p className="flex gap-2">
					<TfiEmail />
					<span>{email}</span>
				</p>
				<p className="flex gap-2">
					<SlScreenSmartphone />
					<span>{phone}</span>
				</p>
				{(socials || []).map(({ id, brand, text, href }) => {
					const Icon = SocialMap[brand as keyof typeof SocialMap];

					return (
						<Link key={id} target="_blank" href={href as string}>
							<Icon className="inline-block" />
							<span className="ml-2">{text}</span>
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

	const { body, skills, experiences, resume_bio, education } = resume;

	return (
		<>
			<Breadcrumbs breadcrumbs={BREADCRUMBS} />

			<div className="border-[--ghost] border-2 rounded w-full mx-auto">
				<ResumeHeader roles={body as string[]} />

				<div
					data-testid="ResumeBody"
					className="flex flex-col md:grid md:grid-cols-10"
				>
					<div data-testid="Sidebar" className="col-span-3">
						{resume_bio ? <ResumeBio bio={resume_bio} /> : null}

						<ContactDetails />

						{skills?.length ? (
							<Skills
								skills={skills}
								className="max-h-[50vh] md:max-h-[110rem] lg:max-h-[83rem] xl:max-h-[130vh] 2xl:max-h-[55rem]"
							/>
						) : null}
					</div>

					<div
						data-testid="Experiences"
						className="col-span-7 border-l-2 border-[--ghost] relative"
					>
						{experiences?.length ? (
							<Experiences
								experiences={experiences}
								className="h-[195vh] lg:h-[320vh] xl:h-[185vh] 2xl:h-[100vh] pb-[8.5rem] 2xl:pb-[0]"
							/>
						) : null}

						{education?.length ? <Education education={education} /> : null}
					</div>
				</div>
			</div>
		</>
	);
};

export const dynamic = "force-dynamic";
export default ResumePage;
