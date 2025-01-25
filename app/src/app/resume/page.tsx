import { cache } from "react";

import { getPage } from "@/lib/cms";
import ResumeBio from "./components/bio";
import Education from "./components/education";
import Experiences from "./components/experiences";
import { setMetadata, SITE_URL } from "@/lib/utils";
import ContactDetails from "./components/contact-details";
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
	const siteUrl = SITE_URL();

	return page
		? setMetadata({
				...page.metadata,
				openGraph: {
					title: page.metadata.title,
					description: page.metadata.description,
					url: `${siteUrl}${page.metadata.slug}`,
					images: [
						{
							url: `${siteUrl}/profile-card.png?slug=${page.metadata.slug}`,
						},
					],
				},
			})
		: null;
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
					className="flex flex-col md:grid"
					style={{
						gridTemplateAreas: `
							"bio experiences experiences experiences"
							"contact experiences experiences experiences"
							"skills experiences experiences experiences"
							"skills education education education"
						`,
					}}
				>
					{resume_bio ? <ResumeBio bio={resume_bio} /> : null}

					<ContactDetails />

					{experiences?.length ? (
						<Experiences experiences={experiences} />
					) : null}

					{education?.length ? <Education education={education} /> : null}

					{skills?.length ? <Skills skills={skills} /> : null}
				</div>
			</div>
		</>
	);
};

export const dynamic = "force-dynamic";
export default ResumePage;
