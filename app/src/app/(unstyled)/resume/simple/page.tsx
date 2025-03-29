import { cache } from "react";

import { getPage } from "@/lib/cms";
// import ResumeBio from "../../(styled)/resume/components/bio";
// import Education from "../../(styled)/resume/components/education";
// import Experiences from "../../(styled)/resume/components/experiences";
import { setMetadata, SITE_URL } from "@/lib/utils";
// import ContactDetails from "../../(styled)/resume/components/contact-details";
// import { ResumeHeader, Skills } from "../../(styled)/resume/components/client";
import type { ResumePage as ResumePageType, Skill, Experience } from "@/types";
import { ResumeHeader } from "@/components/resume/client";
import ResumeBio from "@/components/resume/bio";
import ContactDetails from "@/components/resume/contact-details";

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
			<div className="border-[--ghost] border-2 rounded w-full mx-auto">
				<ResumeHeader roles={[body?.[0] as string]} />

				<div data-testid="ResumeBody" className="flex flex-col">
					{resume_bio ? (
						<ResumeBio
							bio={resume_bio}
							className="h3>w-[3rem] break-all items-center"
						/>
					) : null}

					<ContactDetails isSimple />

					{/* {experiences?.length ? (
						<Experiences experiences={experiences} />
					) : null}

					{education?.length ? <Education education={education} /> : null}

					{skills?.length ? <Skills skills={skills} /> : null} */}
				</div>
			</div>
		</>
	);
};

export const dynamic = "force-dynamic";
export default ResumePage;
